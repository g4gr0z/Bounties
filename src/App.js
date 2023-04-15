import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ethers, BigNumber  } from "ethers";
import React, {useState, useEffect} from 'react';


function App() {
  const [desc,setDesc ] = useState('');
  const [desc1,setDesc1 ] = useState('');
  const [bountyin,SetBountyin ] = useState(''); 
  const [reward,setReward ] = useState('');
  const [deadLine,setDeadLine ] = useState('');
  const [balance, setBalance] = useState('');
  const [numBounties, setNumBounties] = useState('');

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contactAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

  const ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "BountyCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "bountyIndex",
          "type": "uint256"
        }
      ],
      "name": "BountyFailed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "submitter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        }
      ],
      "name": "SubmissionReceived",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "winner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        }
      ],
      "name": "WinnerSelected",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "bountyList",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "enum BountyManager.State",
          "name": "state",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "numSubmission",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bountyIndex",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        }
      ],
      "name": "bountySubmission",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bountyIndex",
          "type": "uint256"
        }
      ],
      "name": "closeBountyIfDeadlineReached",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_reward",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_deadline",
          "type": "uint256"
        }
      ],
      "name": "createBounty",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bountyIndex",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "submissionIndex",
          "type": "uint256"
        }
      ],
      "name": "getBountySubmissionByIndex",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "submitter",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "internalType": "struct BountyManager.Submission",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getNumBounties",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bountyIndex",
          "type": "uint256"
        }
      ],
      "name": "getNumSubmissionsForBounty",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bountyIndex",
          "type": "uint256"
        }
      ],
      "name": "getSelectedWinners",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bountyIndex",
          "type": "uint256"
        }
      ],
      "name": "getTimeLeft",
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
      "name": "manager",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bountyIndex",
          "type": "uint256"
        }
      ],
      "name": "markBountyClosed",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bountyIndex",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "_submissionIndexes",
          "type": "uint256[]"
        }
      ],
      "name": "selectBountyWinner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  // The Contract object
  const Contract = new ethers.Contract(contactAddress, ABI, signer);


  // MetaMask requires requesting permission to connect users accounts
  useEffect(() => {
    
    const connectWallet = async () => {
    await provider.send("eth_requestAccounts", []); 
    }

    const getBalance = async () => {
      const bal = await provider.getBalance(contactAddress)
      const balanceFormatted = ethers.utils.formatEther(bal)
      setBalance(balanceFormatted);
    }

    async function getNumBounties() {
      const numBounty = await Contract.getNumBounties();
    
      console.log(numBounty)
      for (let i = 0; i < numBounty; i++) {
        // Get the bounty details
        const bounty = await Contract.bountyList(i);
        console.log(bounty.reward, bounty.deadline * 1000,bounty.description)
      }
  
  }

    getNumBounties().catch(console.error);
    connectWallet().catch(console.error);
    getBalance().catch(console.error);
  })


  const handleDescChange =(e)=> {
    
    setDesc(e.target.value)
  }
  const handleRewardChange =(e)=> {
    setReward(e.target.value)
  }
  const handleDeadChange =(e)=> {
    const deadlineInput = e.target.value;
    // Convert date and time to epoch time
    const epochTime = new Date(deadlineInput).getTime() / 1000;
    setDeadLine(epochTime)
  }

  const handleDesc1Change =(e)=>{
      setDesc1(e.target.value)
  } 
  const handleBountyIndex =(e)=> {
      SetBountyin(e.target.value)
  }
 
  const handleBountyList = async(e) => {
    e.preventDefault();
    async function getBountyList() {
      try {
          const bountyList = await Contract.bountyList(0);
          return bountyList;
      } catch (error) {
          console.error('Error getting bountyList:', error);
      }
    }
    getBountyList().then((bountyList) => {
      console.log('bountyList:', bountyList);
  });
    
  }

  const handleCreateSubmission = async(e)=>{
    e.preventDefault();
    const createSubmission = await Contract.bountySubmission(bountyin,desc1);
    await createSubmission.wait();
  }

  const handleCreateSubmit =async(e)=> {
    e.preventDefault();
    const rewardWei = ethers.utils.parseUnits(reward, 'ether');
    const createSubmit = await Contract.createBounty(desc,rewardWei,deadLine, {value: rewardWei});
    await createSubmit.wait();
    //in the next line If i console.log rewardwEi it results in bignumber
   console.log(desc,reward,deadLine)
  }

  return (
    <Container>
      <Row>
        <Col>
          
          <Row>
            <h3>Contract balance : {balance}</h3>
            <p>Num of bounites : {numBounties}</p>
          </Row>
          <Row>
          <Button variant="primary" onClick={handleBountyList} type="submit" value="getBountyList">
              print bountylist
          </Button>
          </Row>
          <Row>
          <Button variant="primary" type="submit" value="getNumBounties">Bmit</Button>
          </Row>
          <Button variant="primary" type="submit" value="getNumBounties">Submit</Button>
        <Row>
          <Button variant="primary" type="submit" value="getNumBounties">Submit</Button>
          </Row>       
        </Col>
        <Col> 
        <Row>
        <Form onSubmit={handleCreateSubmit}>
            <Form.Group className="mb-3" value="desc" >
              <Form.Control type="input" onChange={handleDescChange} placeholder="Enter description" />
            </Form.Group>
            <Form.Group className="mb-3" value="reward">
              <Form.Control type="text" onChange={handleRewardChange} placeholder="Enter Reward" />
            </Form.Group>
            <Form.Group className="mb-3" value="deadline">
              <Form.Control type="datetime-local" onChange={handleDeadChange} placeholder="Enter Deadline" />
            </Form.Group>
            <Button variant="primary" type="submit" value="getNumBounties">
              Submit
            </Button>   
          </Form>
        </Row>
        <Row>
        <Form onSubmit={handleCreateSubmission}>
            <Form.Group className="mb-3" value="desc" >
              <Form.Control type="input" onChange={handleDesc1Change} placeholder="Give link to yo github" />
            </Form.Group>
            <Form.Group className="mb-3" value="deadline">
              <Form.Control type="number" onChange={handleBountyIndex} placeholder="Enter Bounty Index" />
            </Form.Group>
            <Button variant="primary" type="submit" value="Submission">
              Submit
            </Button>
          </Form>
        </Row> 
        </Col>
      </Row>
    </Container>
  );
}

export default App;
