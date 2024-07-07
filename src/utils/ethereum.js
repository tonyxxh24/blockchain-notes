import { ethers } from 'ethers';
import NotesABI from '../contracts/Notes.json';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = ''; // Add your contract address after deployment

export const notesContract = new ethers.Contract(contractAddress, NotesABI.abi, signer);

export async function connectWallet() {
  await provider.send("eth_requestAccounts", []);
  return await signer.getAddress();
}