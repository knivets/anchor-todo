const anchor = require('@project-serum/anchor');
const assert = require("assert");

//const program = anchor.workspace.Todo;
const connection = new anchor.web3.Connection('http://127.0.0.1:8899');

describe('todo', async () => {
    // Configure the client to use the local cluster.
    const provider = anchor.Provider.env();
    anchor.setProvider(provider);
    const program = anchor.workspace.Todo;
    let todosAccount, accountBump = null;
    [todosAccount, accountBump] = await anchor.web3.PublicKey.findProgramAddress([
        provider.wallet.publicKey.toBuffer()], program.programId)

    console.log(todosAccount, accountBump);

    it('Is initialized!', async () => {
        const tx = await program.rpc.initialize(new anchor.BN(accountBump), {
            accounts: {
                todoList: todosAccount,
                user: provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            },
        });
        console.log("Your transaction signature", tx);
    });

    it('Is adding todos!', async () => {
        const tx = await program.rpc.add('hello world', {
            accounts: {
                todoList: todosAccount,
                user: provider.wallet.publicKey,
            },
        });
        console.log("Your transaction signature", tx);

        const res = await program.account.todoList.fetch(todosAccount);
        assert.ok(res.list[0] === 'hello world');
        return;

        await program.rpc.add('hello world', {
            accounts: {
                user: provider.wallet.publicKey,
                todoList: todosAccount,
            },
        });

        const res2 = await program.account.todoList.fetch(todosAccount);
        console.log(res2.list);
        assert.ok(res2.list.length > 1);
    });
});
