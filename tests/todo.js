const anchor = require('@project-serum/anchor');
const assert = require("assert");
const web3 = require('@solana/web3.js');

//const program = anchor.workspace.Todo;
const connection = new web3.Connection('http://127.0.0.1:8899');

let todosAccount = new web3.Keypair()

describe('todo', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Todo;

  it('Is initialized!', async () => {
    const tx = await program.rpc.initialize({
        accounts: {
            todoList: todosAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [todosAccount],
    });
    console.log("Your transaction signature", tx);
  });

  it('Is adding todos!', async () => {
    const tx = await program.rpc.add('hello world', {
        accounts: {
            todoList: todosAccount.publicKey,
        },
    });
    console.log("Your transaction signature", tx);

    const res = await program.account.todoList.fetch(todosAccount.publicKey);
    assert.ok(res.list[0] === 'hello world');

    await program.rpc.add('hello world', {
        accounts: {
            todoList: todosAccount.publicKey,
        },
    });

    const res2 = await program.account.todoList.fetch(todosAccount.publicKey);
    assert.ok(res2.list.length === 2);
  });
});
