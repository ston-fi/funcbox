import { Blockchain, SandboxContract, SendMessageResult, TreasuryContract } from '@ton/sandbox';
import { Address, beginCell, Cell, Dictionary, DictionaryValue, loadMessage, Slice, toNano } from '@ton/core';
import { compile } from '@ton/blueprint';
import '@ton/test-utils';
import { crc32 } from 'zlib';
import { randomBytes } from 'crypto';
import { TestCase } from '../wrappers/TestCase';

/**
 * Interprets the contract code cell as a dictionary method_id -> Slice
 */
function codeAsDict(code: Cell) {
    const ProcDictValue: DictionaryValue<Slice> = {
        serialize: (src, builder) => builder.storeSlice(src),
        parse: (src) => src,
    };
    // https://github.com/ton-blockchain/ton/blob/921aa29eb54db42de21e0f89610c347670988ed1/crypto/fift/lib/Asm.fif#L1483
    const procDictKeyLen = 19;
    return Dictionary.loadDirect(Dictionary.Keys.Int(procDictKeyLen), ProcDictValue, code.beginParse().loadRef());
}

describe('FunCBox', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('TestCase');
    });

    let blockchain: Blockchain;
    let testCase: SandboxContract<TestCase>;
    let sender: SandboxContract<TreasuryContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        testCase = blockchain.openContract(TestCase.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');
        sender = await blockchain.treasury('sender');

        const deployResult = await testCase.sendDeploy(deployer.getSender(), toNano('1'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: testCase.address,
            deploy: true,
            success: true,
        });
    });

    function assertMsgSuite(result: SendMessageResult) {
        expect(result.transactions).toHaveTransaction({
            from: sender.address,
            to: testCase.address,
            success: true,
        });
    }

    function assertExcessesMsg(from: Address, to: Address, result: SendMessageResult, queryId = 0n) {
        expect(result.transactions).toHaveTransaction({
            from,
            to,
            body: (c) => {
                if (!c) return false;

                const cs = c.beginParse();
                expect(cs.loadUint(32)).toBe(0xd53276db); // op::excesses
                expect(cs.loadUintBig(64)).toBe(queryId);
                expect(cs.remainingBits).toBe(0);
                expect(cs.remainingRefs).toBe(0);

                return true;
            },
        });
    }

    it('should not include undesired get methods after FunCBox autoload', async () => {
        const dict = codeAsDict(await compile('TestEmpty'));
        expect(dict.keys().length).toBe(1); // +1 for main/recv_internal (0 method_id)
    });

    it('ctx_test.fc', async () => {
        const op = crc32('test_ctx');
        const queryId = Date.now();
        const randPart = randomBytes(32);
        const body = beginCell().storeUint(op, 32).storeUint(queryId, 64).storeBuffer(randPart).endCell();
        const value = toNano('1');

        const sendResult = await sender.send({ to: testCase.address, value, body });
        assertMsgSuite(sendResult);
        expect(sendResult.transactions).toHaveTransaction({
            from: testCase.address,
            to: sender.address,
            success: true,
            body: (x) => {
                if (!x) return false;

                const cs = x.beginParse();
                expect(cs.loadUint(32)).toBe(crc32('test_ctx_ok'));
                expect(cs.loadUint(64)).toBe(queryId);
                expect(cs.loadCoins()).toBe(value);
                expect(cs.loadRef()).toEqualCell(beginCell().storeBuffer(randPart).endCell());
                const rawMsg = loadMessage(cs.loadRef().beginParse());
                expect(rawMsg.body).toEqualCell(body);

                return true;
            },
        });
    });

    it('address_test.fc', async () => {
        assertMsgSuite(await testCase.sendTestAddress(sender.getSender(), toNano('1')));
    });

    it('math_test.fc', async () => {
        assertMsgSuite(await testCase.sendTestMath(sender.getSender(), toNano('1')));
    });

    it('cell_test.fc', async () => {
        assertMsgSuite(await testCase.sendTestCell(sender.getSender(), toNano('1')));
    });

    it('stdlib_ext_test.fc', async () => {
        assertMsgSuite(await testCase.sendTestStdlibExt(sender.getSender(), toNano('1')));
    });

    it('time_test.fc', async () => {
        assertMsgSuite(await testCase.sendTestTime(sender.getSender(), toNano('1')));
    });

    it('utils_test.fc', async () => {
        const result = await testCase.sendTestUtils(sender.getSender(), toNano('1'));
        assertMsgSuite(result);
        assertExcessesMsg(testCase.address, sender.address, result);
    });

    it('message_test.fc', async () => {
        assertMsgSuite(await testCase.sendTestMessage(sender.getSender(), toNano('1')));
    });

    it('dict_test.fc', async () => {
        assertMsgSuite(await testCase.sendTestDict(sender.getSender(), toNano('1')));
    });

    it('actions_test.fc', async () => {
        assertMsgSuite(await testCase.sendTestActions(sender.getSender(), toNano('1')));
    });

    it('reserves_test.fc', async () => {
        assertMsgSuite(await testCase.sendTestReserves(sender.getSender(), toNano('1')));
    });

    it('shard_test.fc', async () => {
        assertMsgSuite(await testCase.sendTestShard(sender.getSender(), toNano('1')));
    });
});
