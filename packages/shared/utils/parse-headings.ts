import { slug } from 'github-slugger'

interface Heading {
    level: number
    headline: string
    href: string
    children: Heading[]
}

export function parseHeadings(markdownText: string): Heading[] {
    const headings: Heading[] = []
    const lines = markdownText.split('\n')

    for (const line of lines) {
        if (line.startsWith('#')) {
            const level = getLevel(line)
            const headline = line.replace(/^#+\s*/, '')
            const href = `#${slug(headline)}`
            const heading: Heading = { level, headline, children: [], href }

            headings.push(heading)
        }
    }

    return headings
}

function getLevel(line: string): number {
    return line.match(/^#+/)[0].length
}
