import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';
import { crc32 } from 'zlib';

export type TestCaseConfig = {};

export function testCaseConfigToCell(config: TestCaseConfig): Cell {
    return beginCell().endCell();
}

export class TestCase implements Contract {
    constructor(
        readonly address: Address,
        readonly init?: { code: Cell; data: Cell },
    ) {}

    static createFromAddress(address: Address) {
        return new TestCase(address);
    }

    static createFromConfig(config: TestCaseConfig, code: Cell, workchain = 0) {
        const data = testCaseConfigToCell(config);
        const init = { code, data };
        return new TestCase(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        return provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(0, 32).storeUint(0, 64).endCell(),
        });
    }

    async sendTestAddress(provider: ContractProvider, via: Sender, value: bigint) {
        return provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(crc32('test_address'), 32).storeUint(0, 64).endCell(),
        });
    }

    async sendTestMath(provider: ContractProvider, via: Sender, value: bigint) {
        return provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(crc32('test_math'), 32).storeUint(0, 64).endCell(),
        });
    }

    async sendTestCell(provider: ContractProvider, via: Sender, value: bigint) {
        return provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(crc32('test_cell'), 32).storeUint(0, 64).endCell(),
        });
    }

    async sendTestStdlibExt(provider: ContractProvider, via: Sender, value: bigint) {
        return provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(crc32('test_stdlib_ext'), 32).storeUint(0, 64).endCell(),
        });
    }

    async sendTestTime(provider: ContractProvider, via: Sender, value: bigint) {
        return provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(crc32('test_time'), 32).storeUint(0, 64).endCell(),
        });
    }

    async sendTestUtils(provider: ContractProvider, via: Sender, value: bigint) {
        return provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(crc32('test_utils'), 32).storeUint(0, 64).endCell(),
        });
    }

    async sendTestMessage(provider: ContractProvider, via: Sender, value: bigint) {
        return provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(crc32('test_message'), 32).storeUint(0, 64).endCell(),
        });
    }

    async sendTestDict(provider: ContractProvider, via: Sender, value: bigint) {
        return provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(crc32('test_dict'), 32).storeUint(0, 64).endCell(),
        });
    }

    async sendTestActions(provider: ContractProvider, via: Sender, value: bigint) {
        return provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(crc32('test_actions'), 32).storeUint(0, 64).endCell(),
        });
    }

    async sendTestReserves(provider: ContractProvider, via: Sender, value: bigint) {
        return provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(crc32('test_reserves'), 32).storeUint(0, 64).endCell(),
        });
    }
}
