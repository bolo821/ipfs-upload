/* src/App.js */
import './App.css'
import { useState } from 'react'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'

/* configure Infura auth settings */
const projectId = process.env.REACT_APP_INFURA_PROJECT_ID
const projectSecret = process.env.REACT_APP_INFURA_PROJECT_SECRET
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

/* create the client */
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
})

function App() {
  const [fileUrl, updateFileUrl] = useState(``)
  async function onChange(e: any) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://infura-ipfs.io/ipfs/${added.path}`
      updateFileUrl(url)
      console.log("IPFS URI: ", url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  return (
    <div className="App">
      <h1>IPFS Example</h1>
      <input
        type="file"
        onChange={onChange}
      />
      {
        fileUrl && (
          <div>
            <img src={fileUrl} width="600px" alt="file" />
            <a href={fileUrl} target="_blank" rel="noreferrer noopener">{fileUrl}</a>
          </div>
        )
      }
    </div>
  );
}

export default App