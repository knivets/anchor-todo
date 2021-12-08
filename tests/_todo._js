//const anchor = require('@project-serum/anchor');
//const assert = require("assert");
const web3 = require('@solana/web3.js');
var pathToModule = require.resolve('@solana/web3.js');
console.log(pathToModule);

//const program = anchor.workspace.Todo;
const connection = new web3.Connection('http://127.0.0.1:8899');

let todosAccount = new web3.Keypair()
var st = '{"_keypair":{"publicKey":{"0":31,"1":114,"2":223,"3":99,"4":234,"5":95,"6":209,"7":13,"8":231,"9":103,"10":164,"11":129,"12":149,"13":50,"14":48,"15":78,"16":101,"17":60,"18":156,"19":229,"20":127,"21":225,"22":129,"23":50,"24":52,"25":142,"26":149,"27":92,"28":9,"29":67,"30":70,"31":152},"secretKey":{"0":221,"1":57,"2":10,"3":208,"4":217,"5":120,"6":213,"7":209,"8":111,"9":112,"10":181,"11":79,"12":210,"13":125,"14":18,"15":153,"16":200,"17":4,"18":195,"19":120,"20":203,"21":170,"22":219,"23":6,"24":196,"25":3,"26":116,"27":245,"28":255,"29":243,"30":158,"31":246,"32":31,"33":114,"34":223,"35":99,"36":234,"37":95,"38":209,"39":13,"40":231,"41":103,"42":164,"43":129,"44":149,"45":50,"46":48,"47":78,"48":101,"49":60,"50":156,"51":229,"52":127,"53":225,"54":129,"55":50,"56":52,"57":142,"58":149,"59":92,"60":9,"61":67,"62":70,"63":152}}}'
//st = JSON.stringify(web3.Keypair.generate())
//console.log(st);
var uninit = '{"_keypair":{"publicKey":{"0":2,"1":11,"2":5,"3":254,"4":226,"5":96,"6":142,"7":7,"8":116,"9":136,"10":47,"11":226,"12":29,"13":33,"14":92,"15":138,"16":184,"17":166,"18":27,"19":159,"20":13,"21":58,"22":214,"23":245,"24":72,"25":134,"26":25,"27":180,"28":0,"29":184,"30":251,"31":16},"secretKey":{"0":213,"1":42,"2":2,"3":58,"4":203,"5":28,"6":210,"7":71,"8":168,"9":12,"10":71,"11":39,"12":97,"13":219,"14":127,"15":174,"16":109,"17":150,"18":217,"19":209,"20":187,"21":242,"22":182,"23":249,"24":185,"25":112,"26":111,"27":118,"28":116,"29":59,"30":93,"31":216,"32":2,"33":11,"34":5,"35":254,"36":226,"37":96,"38":142,"39":7,"40":116,"41":136,"42":47,"43":226,"44":29,"45":33,"46":92,"47":138,"48":184,"49":166,"50":27,"51":159,"52":13,"53":58,"54":214,"55":245,"56":72,"57":134,"58":25,"59":180,"60":0,"61":184,"62":251,"63":16}}}'
const uninitAccount = web3.Keypair.fromSecretKey(new Uint8Array(Object.values(JSON.parse(uninit)._keypair.secretKey)));

const baseAccount = web3.Keypair.fromSecretKey(new Uint8Array(Object.values(JSON.parse(st)._keypair.secretKey)));
console.log('init:', baseAccount.publicKey.toString());
console.log('uninit:', uninitAccount.publicKey.toString());

(async () => {
        let address = new web3.PublicKey('8yZkCJbpBTJYVafWmFSjZzb1HEEnRKGdDbPG2foAKWo');
      let acc = await connection.getAccountInfo(address);
      console.log('account:', acc.lamports);
    /*let crAccTx = new web3.Transaction().add(web3.SystemProgram.createAccount({
        space: 200,
        lamports: 10000,
        fromPubkey: baseAccount.publicKey,
        newAccountPubkey: uninitAccount.publicKey,
        programId: web3.SystemProgram.programId
    }));
    await web3.sendAndConfirmTransaction(connection, crAccTx, [baseAccount, uninitAccount])*/

  /*let transferTransaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
        fromPubkey: baseAccount.publicKey,
        toPubkey: uninitAccount.publicKey,
        lamports: 100000,
    }),
    );
    await web3.sendAndConfirmTransaction(connection, transferTransaction, [baseAccount])*/

    /*let allocateInstruction = web3.SystemProgram.allocate({
    accountPubkey: uninitAccount.publicKey,
    space: 10000,
})
let transaction = new web3.Transaction().add(allocateInstruction);

await web3.sendAndConfirmTransaction(connection, transaction, [baseAccount, uninitAccount])*/


  //let address = new web3.PublicKey('GJjNajxuoyY6eKEhCSUSgKbgpexFtv5tPmgKZ8NnKxBt');
  //let account = await connection.getAccountInfo(uninitAccount.publicKey);
  //console.log('account:', account);
})();

return;
/*
describe('todo', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Todo;

  const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));

  /*(async () => {
      let minimumAmount = await connection.getMinimumBalanceForRentExemption(1000);
      console.log('min', minimumAmount);
  })();*/

  /*(async () => {
      let address = new web3.PublicKey('37DQf55wM4kiXgWmYFExG5pa6DkK9C8iMZpEK8phiDcg');
      let account = await connection.getAccountInfo(address);
      console.log('account:', account.data);
  })();
  return;

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
});*/
