import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { generateUuid } from './uuid'

type Bindings = {
	DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

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

app.get("/api/getCommends/:slug", async (c) => {
	const { slug } = c.req.param()

	const result = await c.env.DB.prepare(`
		select * from commends where slug = ?
	`).bind(slug).first()

	return c.json(result)
})

app.put("/api/recommendCommend/:slug", async (c) => {
	const { slug } = c.req.param()

	const { success } = await c.env.DB.prepare(`
		insert or replace into commends(slug, positive, negative) values(?, ifnull((select positive from commends where ? == commends.slug), 0) + 1, ifnull((select negative from commends where ? == commends.slug), 0))
	`).bind(slug, slug, slug).run()

	if (success) {
		c.status(200)
		return c.text('Success')
	}
	c.status(500)
	return c.text(`Shomething went wrong`)
})

app.put("/api/disagreeCommend/:slug", async (c) => {
	const { slug } = c.req.param()

	const { success } = await c.env.DB.prepare(`
		insert or replace into commends(slug, positive, negative) values(?, ifnull((select positive from commends where ? == commends.slug), 0), ifnull((select negative from commends where ? == commends.slug), 0) + 1)
	`).bind(slug, slug, slug).run()

	if (success) {
		c.status(200)
		return c.text('Success')
	}
	c.status(500)
	return c.text(`Shomething went wrong`)
})

export default app
