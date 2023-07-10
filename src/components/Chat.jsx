import { useState, useRef, useEffect } from "react"
import axios from "axios";
import Loader from "./Loader"
const Chat = () => {
  const [messageList, setMessageList] = useState([])
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)

  const bottomElementRef = useRef(null);

  useEffect(() => {
    bottomElementRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  const handleChange = (e) => {
    setInputText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    console.log("hiiii")
    const data = {
      question: inputText,
      documentation: '1'
    };

    axios.post('http://127.0.0.1:5000/question', data)
      .then(response => {
        console.log('hiii')
        const data = response.data
        setMessageList([...messageList, {question: data.question, answer: data.response}])
        console.log('Submitted text:', inputText)
        console.log(response.data);
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
    setInputText('')
    console.log('ml', messageList)
  };
    
    

  

  const buttonClass = inputText ? 'bg-blue-500 text-white py-2 px-4 rounded-r-lg' : 'bg-gray-500 text-white py-2 px-4 rounded-r-lg'
  

  return (
    
    <div className="flex flex-col justify-between h-screen">
      <div className="xl:mx-64 ">
        <div className=" p-8">
          <div className="bg-blue-500 text-white py-4 px-6 rounded-md my-2">Hi, how can I help you?</div>
          
            {messageList.map((message) => (
              <>
                <div className="text-stone-50 flex justify-center my-4">{message.question}</div>
                {loading ? <Loader /> : <div className="bg-blue-500 text-white py-4 px-6 rounded-md my-2">{message.answer}</div>}
              </>
            ))}
          
          
        </div>
      </div>
      <div className="xl:mx-32  pb-8">
      <form ref={bottomElementRef} onSubmit={handleSubmit}>
        <div className="flex">
          <input placeholder='Enter your question'  type="text" value={inputText} onChange={handleChange} className="resize-none w-full p-2 pl-4 border border-gray-300 rounded-l-lg"></input>
          <button className={buttonClass} type="submit" disabled={!inputText}>Send</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Chat