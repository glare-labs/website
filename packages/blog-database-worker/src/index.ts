import { Hono } from 'hono'
import { cors } from 'hono/cors'


/**
 * RFC4122 like, v4.
 * 
 * @license CC BY-SA 4.0
 * @link https://stackoverflow.com/a/8809472/
 * @author Briguy37
 */
export const generateUuid = () => {
	let d = new Date().getTime()
	let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		let r = Math.random() * 16
		if (d > 0) {
			r = (d + r) % 16 | 0
			d = Math.floor(d / 16)
		} else {
			r = (d2 + r) % 16 | 0
			d2 = Math.floor(d2 / 16)
		}
		return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16)
	})
}


const app = new Hono()

app.use('/api/*', cors())

app.get("/api/getComments/:slug", async (c) => {
	const { slug } = c.req.param()

	const { results } = await c.env.DB.prepare(`
		select * from comments where slug = ?
	`).bind(slug).all()

	return c.json(results)
})

app.post("/api/pushComment/:slug", async (c) => {
	const { slug } = c.req.param()
	const { content, userGuid, isAnonymous } = await c.req.json()

	if (!isAnonymous && !userGuid) {
		return c.text(`isAnonymous is true but userGuid did not provide.`)
	}

	if (!content || typeof content !== 'string' || content.length === 0) {
		return c.text(`The content is invaild.`)
	}

	const { success } = await c.env.DB.prepare(`
		insert into comments(guid, content, sendTimestamp, slug, userGuid, isAnonymous) values(?, ?, ?, ?, ?, ?)
	`).bind(generateUuid(), content, new Date().getMilliseconds(), slug, userGuid, isAnonymous).run()

	if (success) {
		c.status(200)
		return c.text(`Success`)
	}
	c.status(500)
	return c.text(`Something went wrong`)
})

export default app
