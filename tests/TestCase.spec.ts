import { Blockchain, SandboxContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { TestCase } from '../wrappers/TestCase';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('TestCase', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('TestCase');
    });

    let blockchain: Blockchain;
    let testCase: SandboxContract<TestCase>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        testCase = blockchain.openContract(TestCase.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await testCase.sendDeploy(deployer.getSender(), toNano('1'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: testCase.address,
            deploy: true,
            success: true,
        });
    });

    it('should run tests', async () => {
        // the check is done inside beforeEach
        // blockchain and testCase are ready to use
    });
});
