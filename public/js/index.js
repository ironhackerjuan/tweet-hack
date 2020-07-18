function like(e) {
	const button = e.currentTarget;
	axios.get(`http://localhost:3000/tweets/${button.id}/like`)
		.then(res => {
			const add = res.data.like;
			button.querySelector('.likes-count').innerText = Number(button.querySelector('.likes-count').innerText) + add;
		})
		.catch(console.error)
}