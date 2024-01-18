import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type TestCaseConfig = {};

export function testCaseConfigToCell(config: TestCaseConfig): Cell {
    return beginCell().endCell();
}

export class TestCase implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) { }

    static createFromAddress(address: Address) {
        return new TestCase(address);
    }

    static createFromConfig(config: TestCaseConfig, code: Cell, workchain = 0) {
        const data = testCaseConfigToCell(config);
        const init = { code, data };
        return new TestCase(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0, 32)
                .storeUint(0, 64)
                .endCell(),
        });
    }
}
