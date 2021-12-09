const anchor = require('@project-serum/anchor');
const assert = require("assert");
const web3 = require('@solana/web3.js');

//const program = anchor.workspace.Todo;
const connection = new web3.Connection('http://127.0.0.1:8899');

describe('todo', async () => {
    // Configure the client to use the local cluster.
    const provider = anchor.Provider.env();
    anchor.setProvider(provider);
    const program = anchor.workspace.Todo;
    let todosAccount, accountBump = null;
    [todosAccount, accountBump] = await web3.PublicKey.findProgramAddress([
        Buffer.from("todo_list3")], program.programId)

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
            },
        });
        console.log("Your transaction signature", tx);

        const res = await program.account.todoList.fetch(todosAccount);
        assert.ok(res.list[0] === 'hello world');

        await program.rpc.add('hello world', {
            accounts: {
                todoList: todosAccount,
            },
        });

        const res2 = await program.account.todoList.fetch(todosAccount);
        console.log(res2.list);
        assert.ok(res2.list.length > 1);
    });
});
