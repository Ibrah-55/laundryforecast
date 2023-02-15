import React from 'react'
const styles= {
    background: `url('https://images.unsplash.com/photo-1536999606895-b6c1971676c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80')`
}
function Landing() {
  return (
    <div className="h-screen bg-gray-50 flex items-center">
	<section className="w-full bg-cover bg-center py-72 shadow-lg" style={styles}>
		<div className="container mx-auto text-center text-black">
			<h1 className="text-3xl font-medium mb-6">Predict your washing</h1>
			<p className="text-xl mb-12">View current and check weather around. Prevent your clothes from being rained on</p>
			<a href="/weathernow" className="bg-indigo-500 text-white py-4 px-12 rounded-full hover:bg-indigo-600">Get started</a>
		</div>
	</section>
</div>
  )
}

export default Landing
