import { useState, useRef, useEffect } from "react"

// TODO fix styles, add mqs and finish functionality 
function Chat() {
  const [messageList, setMessageList] = useState([])
  const [inputText,setInputText] = useState('')

  const bottomElementRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom on component mount
    bottomElementRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  const handleChange = (e) => {
    setInputText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setMessageList([...messageList, {question: inputText, answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'}])
    console.log('Submitted text:', inputText)
    setInputText('')
    console.log('ml', messageList);

  }

  const buttonClass = inputText ? 'bg-blue-500 text-white py-2 px-4 rounded-r-lg' : 'bg-gray-500 text-white py-2 px-4 rounded-r-lg';
  return (
    
    <div className="flex flex-col justify-between h-screen">
      <div class="xl:mx-64 ">
      {/* TODO check if this is best practice  */}
        <div class=" p-8">
          <div class="bg-blue-500 text-white py-4 px-6 rounded-md my-2">Hi, how can I help you?</div>
          {messageList.map((message) => (
            <>
              <div class="text-stone-50 flex justify-center my-4">{message.question}</div>
              <div class="bg-blue-500 text-white py-4 px-6 rounded-md my-2">{message.answer}</div>
            </>
          ))}
          
        </div>
      </div>
      
      <div className="xl:mx-32  pb-8">
      <form ref={bottomElementRef} onSubmit={handleSubmit}>
        <div class="flex">
          <input placeholder='Enter your question'  type="text" value={inputText} onChange={handleChange} class="resize-none w-full p-2 pl-4 border border-gray-300 rounded-l-lg"></input>
          <button class={buttonClass} type="submit" disabled={!inputText}>Send</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Chat