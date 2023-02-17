import { background } from '@chakra-ui/react'
import React from 'react'
const styles= {
    background: `url('https://images.unsplash.com/photo-1536999606895-b6c1971676c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80')`,
}
function Landing() {
  return (
    <div className="h-screen bg-no-repeat flex items-center" style={styles}>
        	<section className="w-full  bg-center py-72 shadow-lg" >
		<div className="container mx-auto text-center text-black">
			<h1 className="text-3xl font-medium mb-6">Predict your washing</h1>
            
			<p className="text-xl mb-12">See weather details. Prevent your clothes from being rained on</p>
            <span loading='lazy' class="inline-block animate-bounce rounded-full p-4 bg-teal-400 text-white text-sm">
    <a href="/weathernow" >Get started</a>
        
    </span>
    <br />
    <br />
		</div>

	</section>
   
</div>
  )
}

export default Landing
