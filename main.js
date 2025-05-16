let WALLET_CONNECTED = "";
let contractAddress = "0x5a73AB25129CEF5f27b6CcD66a2547460593c01c";
const contractAbi = [
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "_candidateNames",
        "type": "string[]"
      },
      {
        "internalType": "uint256",
        "name": "_durationInMinutes",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "addCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllVotesOfCandiates",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Voting.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRemainingTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ok",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_candidateIndex",
        "type": "uint256"
      }
    ],
    "name": "getVotesOfCandiate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getVotingStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_candidateIndex",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "votingEnd",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "votingStart",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const getProviderAndSigner = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask.");
    return null;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  return { provider, signer };
};

const connectMetamask = async (section) => {
  const res = await getProviderAndSigner();
  if (!res) return;

  WALLET_CONNECTED = await res.signer.getAddress();
  document.getElementById(`metamasknotification${section}`).innerHTML = "Metamask ID is connected.";
  updateMaxAttribute();
};

const voteStatus = async () => {
  if (!WALLET_CONNECTED) {
    document.getElementById("status").innerHTML = "Please connect your MetaMask ID first.";
    return;
  }

  const res = await getProviderAndSigner();
  if (!res) return;
  const contract = new ethers.Contract(contractAddress, contractAbi, res.signer);

  const currentStatus = await contract.getVotingStatus();
  const time = await contract.getRemainingTime();

  document.getElementById("status").innerHTML = currentStatus
    ? "Voting is currently open."
    : "Voting is finished.";
  document.getElementById("time").style.display = "block";
  document.getElementById("time").innerHTML = `Remaining time is ${parseInt(time)} seconds`;
};

const addVote = async () => {
  if (!WALLET_CONNECTED) {
    document.getElementById("cand").innerHTML = "Please connect your MetaMask ID first.";
    return;
  }

  const candidateIndex = parseInt(document.getElementById("vote").value, 10);
  const cand = document.getElementById("cand");

  if (isNaN(candidateIndex)) {
    cand.innerHTML = "Please enter a valid candidate index.";
    return;
  }

  const res = await getProviderAndSigner();
  if (!res) return;
  const contract = new ethers.Contract(contractAddress, contractAbi, res.signer);

  const currentStatus = await contract.getVotingStatus();
  const hasVoted = await contract.ok();

  if (!currentStatus) {
    cand.innerHTML = "Cannot vote. Voting has ended.";
    return;
  }

  if (hasVoted) {
    cand.innerHTML = "You have already voted.";
    return;
  }

  try {
    cand.innerHTML = "Please wait...";
    const tx = await contract.vote(candidateIndex);
    await tx.wait();
    cand.innerHTML = "Your vote has been recorded.";
  } catch (err) {
    cand.innerHTML = "Error submitting vote: " + err.message;
  }
};

const getAllCandidates = async () => {
  if (!WALLET_CONNECTED) {
    document.getElementById("p3").innerHTML = "Please connect your MetaMask ID first.";
    return;
  }

  const res = await getProviderAndSigner();
  if (!res) return;
  const contract = new ethers.Contract(contractAddress, contractAbi, res.signer);

  const candidates = await contract.getAllVotesOfCandiates(); // Keep if contract name has typo
  const tbody = document.querySelector("#myTable tbody");
  tbody.innerHTML = "";

  candidates.forEach((candidate, i) => {
    const row = tbody.insertRow();
    row.insertCell().innerHTML = i;
    row.insertCell().innerHTML = candidate.name;
    row.insertCell().innerHTML = candidate.voteCount;
  });

  document.getElementById("myTable").style.display = 'block';
  document.getElementById("dummy").style.display = 'inline';
};

const updateMaxAttribute = async () => {
  const el = $('#vote');
  const res = await getProviderAndSigner();
  if (!res) return;

  const contract = new ethers.Contract(contractAddress, contractAbi, res.signer);
  const candidates = await contract.getAllVotesOfCandiates(); // Keep as-is if typo in contract
  const max = candidates.length - 1;
  el.attr('max', max.toString());
};

const getWinner = async () => {
  if (!WALLET_CONNECTED) {
    document.getElementById("p4").innerHTML = "Please connect your MetaMask ID first.";
    return;
  }

  const res = await getProviderAndSigner();
  if (!res) return;

  const contract = new ethers.Contract(contractAddress, contractAbi, res.signer);
  const status = await contract.getVotingStatus();
  const candidates = await contract.getAllVotesOfCandiates();

  let winner = { name: "", voteCount: 0 };
  candidates.forEach(candidate => {
    if (candidate.voteCount > winner.voteCount) {
      winner = candidate;
    }
  });

  document.getElementById("p4").style.display = 'none';
  document.getElementById("myTable").style.display = 'none';
  document.getElementById("dummy").style.display = 'none';

  const winnerParagraph = document.getElementById("winner");
  if (winner.name && !status) {
    winnerParagraph.innerHTML = `The winner is: ${winner.name}`;
  } else if (status) {
    winnerParagraph.innerHTML = "Voting is still open. Cannot determine the winner yet.";
  } else {
    winnerParagraph.innerHTML = "No winner determined yet.";
  }
};

