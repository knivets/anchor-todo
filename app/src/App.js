import { useState, useEffect } from 'react';
import { Program, Provider, web3, BN } from '@project-serum/anchor';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css';
import idl from './todo.json';

const wallets = [getPhantomWallet()]

const programID = new web3.PublicKey(idl.metadata.address);

const getProvider = (wallet) => {
    let network = "http://127.0.0.1:8899";
    let connection = new web3.Connection(network, 'processed');

    let provider = new Provider(
      connection, wallet, 'processed',
    );
    return provider;
}

const getProgram = (wallet) => {
    let provider = getProvider(wallet);
    return new Program(idl, programID, provider);
}

const getWalletAccount = async (wallet) => {
    return await web3.PublicKey.findProgramAddress([wallet.toBuffer()], programID);
}

function App() {
    const [update, setUpdate] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [input, setInput] = useState('');
    const [init, setInit] = useState(false);
    const wallet = useWallet();

    useEffect(() => {
        (async () => {
            if (!wallet.connected || (init && !update)) {
                return;
            }
            console.log('fetching');

            const program = getProgram(wallet);
            const [todosAccount, accountBump] = await getWalletAccount(wallet.publicKey);

            try {
                const account = await program.account.todoList.fetch(todosAccount);
                console.log('account: ', account);
                setInit(true);
                setDataList(account.list);
                setUpdate(false);
            } catch (e){
                console.log(e);
            }
        })();
    }, [wallet, update, init]);

    const handleInit = async () => {
        const program = getProgram(wallet);
        const [todosAccount, accountBump] = await getWalletAccount(wallet.publicKey);

        try {
          await program.rpc.initialize(new BN(accountBump), {
            accounts: {
                todoList: todosAccount,
                user: wallet.publicKey,
                systemProgram: web3.SystemProgram.programId,
            },
          });

          setUpdate(true);
        } catch (err) {
          console.log("Transaction error: ", err);
        }
    }

    const handleUpdate = async () => {
        const program = getProgram(wallet);
        const [todosAccount, accountBump] = await getWalletAccount(wallet.publicKey);

        try {
          await program.rpc.add(input, {
            accounts: {
                todoList: todosAccount,
                user: wallet.publicKey,
            },
          });

          setUpdate(true);
        } catch (err) {
          console.log("Transaction error: ", err);
        }
    }

    if (!wallet.connected) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop:'100px' }}>
            <WalletMultiButton />
          </div>
        )
    } else {
        return (
          <div className="App">
            <h1>Todo list</h1>
            <div>
              {!init ?
                (<button onClick={handleInit}>Initialize</button>) : (
                  <div>
                    <input
                      placeholder="Add new data"
                      onChange={e => setInput(e.target.value)}
                      value={input}
                    />
                    <button onClick={handleUpdate}>Add data</button>
                  </div>
                )}
            <ul>
              {
                dataList.map((d, i) => <li key={i}>{d}</li>)
              }
            </ul>
            </div>
          </div>
        );
    }
}

const AppWithProvider = () => (
  <ConnectionProvider endpoint="http://127.0.0.1:8899">
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <App />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
)

export default AppWithProvider;
