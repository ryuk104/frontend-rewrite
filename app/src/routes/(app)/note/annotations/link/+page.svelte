<script>
	import Error from '$lib/notion2svelte/Error.svelte';
	import Cover from '$lib/notion2svelte/Cover.svelte';
	import Title from '$lib/notion2svelte/Title.svelte';
	import BulletedListItem from '$lib/notion2svelte/BulletedListItem.svelte';
	import Callout from '$lib/notion2svelte/Callout.svelte';
	import ChildPage from '$lib/notion2svelte/ChildPage.svelte';
	import Code from '$lib/notion2svelte/Code.svelte';
	import ColumnList from '$lib/notion2svelte/ColumnList.svelte';
	import Column from '$lib/notion2svelte/Column.svelte';
	import Divider from '$lib/notion2svelte/Divider.svelte';
	import Embed from '$lib/notion2svelte/Embed.svelte';
	import Header from '$lib/notion2svelte/Header.svelte';
	import Image from '$lib/notion2svelte/Image.svelte';
	import IndentGroup from '$lib/notion2svelte/IndentGroup.svelte';
	import Underline from '$lib/notion2svelte/Underline.svelte';
	import InlineCode from '$lib/notion2svelte/InlineCode.svelte';
	import InlineColor from '$lib/notion2svelte/InlineColor.svelte';
	import Equation from '$lib/notion2svelte/Equation.svelte';
	import Link from '$lib/notion2svelte/Link.svelte';
	import NumberedListItem from '$lib/notion2svelte/NumberedListItem.svelte';
	import Paragraph from '$lib/notion2svelte/Paragraph.svelte';
	import Quote from '$lib/notion2svelte/Quote.svelte';
	import TodoItem from '$lib/notion2svelte/TodoItem.svelte';
	import Toggle from '$lib/notion2svelte/Toggle.svelte';
	import { setContext } from 'svelte';

	setContext('pageStuff', {
		pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
		title: 'Link'
	});
</script>

<svelte:head>
	<title>Link</title>
</svelte:head>

<Cover coverURL={''} iconEmojiOrURL={'undefined'} />

<Title>Link</Title>

<Header level={1}>1. Notion original</Header>
<Image
	url="/assets/annotations/link/50b8f6b3-f2aa-47f5-bf05-b5b59183d3ce.png"
	caption="Note how Notion gives the external link a slightly slimmer font weight"
	>Note how Notion gives the external link a slightly slimmer font weight</Image
>
<Header level={1}>2. Notion API</Header>
<Paragraph
	blockProps={{
		pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
		id: '0538fec5-3bc6-4c24-815d-78b5ce846819',
		created_time: '2022-01-28T20:26:00.000Z',
		last_edited_time: '2022-12-08T08:39:00.000Z'
	}}
>
	<InlineColor value="gray">Partial output of&ensp;</InlineColor><InlineColor value="gray"
		><em>src/routes/[slug]/notion-export.js</em></InlineColor
	>
</Paragraph>
<Code
	code={`\{
      …
            &quot;plain_text&quot;: &quot;Internal page mention&quot;,
      …
    \{
      …
      &quot;bulleted_list_item&quot;: \{
        &quot;text&quot;: [
          \{
            &quot;type&quot;: &quot;mention&quot;,
            &quot;mention&quot;: \{
              &quot;type&quot;: &quot;page&quot;,
              &quot;page&quot;: \{
                &quot;id&quot;: &quot;57ec9a2d-b854-4bf6-94a4-5f0e2a0b68d1&quot;
              }
            },
            &quot;annotations&quot;: \{…},
            &quot;plain_text&quot;: &quot;Writing Good Slugs&quot;,
            &quot;href&quot;: &quot;https://www.notion.so/57ec9a2db8544bf694a45f0e2a0b68d1&quot;
          }
        ]
      }
    },
    \{
      …
            &quot;plain_text&quot;: &quot;Internal alias&quot;,
      …
    },
    \{
      …
      &quot;bulleted_list_item&quot;: \{
        &quot;text&quot;: [
          \{
            &quot;type&quot;: &quot;text&quot;,
            &quot;text&quot;: \{
              &quot;content&quot;: &quot;Writing Good Snails&quot;,
              &quot;link&quot;: \{
                &quot;url&quot;: &quot;/57ec9a2db8544bf694a45f0e2a0b68d1&quot;
              }
            },
            &quot;annotations&quot;: \{…},
            &quot;plain_text&quot;: &quot;Writing Good Snails&quot;,
            &quot;href&quot;: &quot;/57ec9a2db8544bf694a45f0e2a0b68d1&quot;
          }
        ]
      }
    },
    \{
      …
            &quot;plain_text&quot;: &quot;External link&quot;,
      …
    },
    \{
      …
      &quot;bulleted_list_item&quot;: \{
        &quot;text&quot;: [
          \{
            &quot;type&quot;: &quot;text&quot;,
            &quot;text&quot;: \{
              &quot;content&quot;: &quot;Writing Good Puppy Dog Tales&quot;,
              &quot;link&quot;: \{
                &quot;url&quot;: &quot;https://en.wikipedia.org/wiki/What_Are_Little_Boys_Made_Of%3F&quot;
              }
            },
            &quot;annotations&quot;: \{…},
            &quot;plain_text&quot;: &quot;Writing Good Puppy Dog Tales&quot;,
            &quot;href&quot;: &quot;https://en.wikipedia.org/wiki/What_Are_Little_Boys_Made_Of%3F&quot;
          }
        ]
      }
    }`}
	language="json">There’s so much going on here, it can be a bit overwhelming!</Code
><Paragraph
	blockProps={{
		pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
		id: '64d8f7b1-a938-4124-8da8-fdf1536c49a5',
		created_time: '2022-01-30T10:07:00.000Z',
		last_edited_time: '2022-01-30T22:43:00.000Z'
	}}
>
	Without even getting into bookmarks and user mentions, et al, things are already kinda complex:
</Paragraph>
<BulletedListItem>We have 2 types of object but 3 different styles of link!</BulletedListItem>
<IndentGroup>
	<BulletedListItem><InlineCode code={'type:mention'} /></BulletedListItem>
	<IndentGroup>
		<BulletedListItem>1 link style</BulletedListItem>
		<IndentGroup>
			<BulletedListItem><em>page mention</em></BulletedListItem>
		</IndentGroup>
	</IndentGroup>
	<BulletedListItem><InlineCode code={'text'} />+<InlineCode code={'url'} /></BulletedListItem>
	<IndentGroup>
		<BulletedListItem>2 link styles</BulletedListItem>
		<IndentGroup>
			<BulletedListItem
				><em>relative to root</em>&ensp;(starts with&ensp;<InlineCode
					code={'/'}
				/>)</BulletedListItem
			>
			<BulletedListItem
				><em>absolute</em>&ensp;(starts with protocol: http, mailto, et al)</BulletedListItem
			>
		</IndentGroup>
	</IndentGroup>
	<Toggle
		>I suspect this situation is the result of some more general structure needed to accommodate
		Turn-intoable blocks, but maybe it’s just an oversight when they could have just been explicit
		and had three types:&ensp;<InlineCode code={'mention'} />,&ensp;<InlineCode code={'alias'} />,
		and&ensp;<InlineCode code={'external'} />. That’s my opinion…and that’s why&ensp;<em
			>notion2svelte</em
		>&ensp;does just that! 😎
		<span slot="children"
			><Paragraph
				blockProps={{
					pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
					id: 'fb5d474c-0abe-43a2-b703-fe71fdd13992',
					created_time: '2022-01-30T23:23:00.000Z',
					last_edited_time: '2022-01-30T23:23:00.000Z'
				}}
			>
				I may be misinterpreting the distinction between the two text+url link types, but this
				doesn’t really matter. What matters is that Notion has demonstrated in their own UI that
				these two link styles can be treated differently — even if the only difference is a slight
				shift in font-weight — and so there’s no reason we can’t consider a similar option.
			</Paragraph>
			<Paragraph
				blockProps={{
					pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
					id: 'aa9ef751-6fb0-4964-9ff4-97ec5331f0dc',
					created_time: '2022-01-30T23:19:00.000Z',
					last_edited_time: '2022-01-30T23:23:00.000Z'
				}}
			>
				Of course, if you want to go the other way, nothing’s stopping you from ignoring the&ensp;<InlineCode
					code={'type'}
				/>&ensp;prop in your Link component:
			</Paragraph>
			<Code
				code={`&lt;script&gt;
  export let url;
&lt;/script&gt;

&lt;a href=\{url}&gt;&lt;slot/&gt;&lt;/a&gt;`}
				language="html">The minimum Link.svelte</Code
			></span
		></Toggle
	>
</IndentGroup>
<BulletedListItem>There’s duplicate data:</BulletedListItem>
<IndentGroup>
	<BulletedListItem
		>As far as I can tell,&ensp;<InlineCode code={'text[n].text.link.url'} />&ensp;is&ensp;<em
			>always</em
		>&ensp;identical to the adjacent&ensp;<InlineCode code={'text[n].href'} /></BulletedListItem
	>
	<BulletedListItem
		><InlineCode code={'text[n].mention.page.id'} />&ensp;is just&ensp;<InlineCode
			code={'text[n].href'}
		/>&ensp;without the host —&ensp;<em>https://www.notion.so/</em>&ensp;— sliced off</BulletedListItem
	>
	<Paragraph
		blockProps={{
			pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
			id: '2271926f-ea39-46d2-bd8e-f721e99bbb2c',
			created_time: '2022-01-30T23:25:00.000Z',
			last_edited_time: '2022-01-30T23:34:00.000Z'
		}}
	>
		<em>notion2svelte</em>&ensp;reduces these duplications to a single&ensp;<InlineCode
			code={'href'}
		/>&ensp;prop.
	</Paragraph>
</IndentGroup>
<Header level={1}>3. Svelte output</Header>
<Paragraph
	blockProps={{
		pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
		id: '28871a46-c697-4500-b517-1c526797ab38',
		created_time: '2022-01-28T20:32:00.000Z',
		last_edited_time: '2022-01-28T20:32:00.000Z'
	}}
>
	<InlineColor value="gray">Partial output of&ensp;</InlineColor><InlineColor value="gray"
		><em>src/routes/[slug].svelte</em></InlineColor
	>
</Paragraph>
<Code
	code={`…
  Internal page mention
…
&lt;BulletedListItem&gt;
  &lt;Link type=&quot;mention&quot; href=&quot;/rules-for-writing-good-slugs&quot;&gt;
    Writing Good Slugs
  &lt;/Link&gt;
&lt;/BulletedListItem&gt;
…
  Internal alias
…
&lt;BulletedListItem&gt;
  &lt;Link type=&quot;alias&quot; href=&quot;/rules-for-writing-good-slugs&quot;&gt;
    Writing Good Snails
  &lt;/Link&gt;
&lt;/BulletedListItem&gt;
…
  External link
…
&lt;BulletedListItem&gt;
  &lt;Link type=&quot;absolute&quot; href=&quot;https://en.wikipedia.org/wiki/What_Are_Little_Boys_Made_Of%3F&quot;&gt;
    Writing Good Puppy Dog Tales
    &lt;/Link&gt;
&lt;/BulletedListItem&gt;`}
	language="html"
	>The&ensp;<em>type</em>&ensp;prop can be either&ensp;<em>mention</em>,&ensp;<em>alias</em
	>&ensp;or&ensp;<em>external</em>.</Code
><Header level={1}>4. Example rendering</Header>
<Paragraph
	blockProps={{
		pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
		id: '37637bb7-2a74-4905-8474-3d3ed2994a92',
		created_time: '2022-01-29T04:11:00.000Z',
		last_edited_time: '2022-01-31T03:40:00.000Z'
	}}
>
	<InlineColor value="gray">Rendered by</InlineColor><Link
		type="absolute"
		href="https://github.com/nvlgzr/notion2svelte/blob/main/demo-app/src/lib/notion2svelte/Link.svelte"
		><InlineColor value="gray">Link.svelte</InlineColor></Link
	>
</Paragraph>
<Paragraph
	blockProps={{
		pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
		id: '469b3cb0-70a9-4129-84f5-00f620532ad6',
		created_time: '2022-01-28T00:01:00.000Z',
		last_edited_time: '2022-01-30T06:57:00.000Z'
	}}
>
	The Link component lets you differentiate between ⑴ internal page mentions, ⑵ links to internal
	pages — I like to think of these as aliased mentions — and ⑶ links to external pages:
</Paragraph>
<Paragraph
	blockProps={{
		pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
		id: '32835464-e2aa-4cde-8f03-494320c60659',
		created_time: '2022-01-29T22:13:00.000Z',
		last_edited_time: '2022-01-29T22:15:00.000Z'
	}}
>
	<strong>Internal page mention</strong>
</Paragraph>
<BulletedListItem
	><Link type="mention" href="/high-level-discussion/rules-for-writing-good-slugs"
		>Writing Good Slugs</Link
	></BulletedListItem
>
<Paragraph
	blockProps={{
		pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
		id: '691abeb0-ad0e-4eb6-b0d2-7859fa479552',
		created_time: '2022-01-29T22:14:00.000Z',
		last_edited_time: '2022-01-29T23:44:00.000Z'
	}}
>
	<strong>Internal alias</strong>
</Paragraph>
<BulletedListItem
	><Link type="alias" href="/high-level-discussion/rules-for-writing-good-slugs"
		>Writing Good Snails</Link
	></BulletedListItem
>
<Paragraph
	blockProps={{
		pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
		id: '48f36011-893c-4d85-8be6-b7fec8be13e4',
		created_time: '2022-01-29T22:14:00.000Z',
		last_edited_time: '2022-01-29T22:16:00.000Z'
	}}
>
	<strong>External link</strong>
</Paragraph>
<BulletedListItem
	><Link type="absolute" href="https://en.wikipedia.org/wiki/What_Are_Little_Boys_Made_Of%3F"
		>Writing Good Puppy Dog Tales</Link
	></BulletedListItem
>
<Paragraph
	blockProps={{
		pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
		id: '72c30aa3-a7d4-4491-b33d-522996ece908',
		created_time: '2022-01-30T06:38:00.000Z',
		last_edited_time: '2022-01-30T06:45:00.000Z'
	}}
/>
<Toggle
	><strong>A word about links with “annotations”</strong>
	<span slot="children"
		><Paragraph
			blockProps={{
				pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
				id: 'd98a87c9-bdfb-4e44-b102-644b0f3229a0',
				created_time: '2022-01-30T00:22:00.000Z',
				last_edited_time: '2022-01-30T10:38:00.000Z'
			}}
		>
			Notion’s handling of links is buggy. Specifically, as soon as you start applying styles
			to&ensp;<em>parts</em>&ensp;of the link, you suddenly end up with&ensp;<em
				>more than one link</em
			>! Don’t believe me? Follow along by opening this page’s&ensp;<Link
				type="alias"
				href="/annotations/link">original in Notion</Link
			>, and inspect the raw source for these examples ↓
		</Paragraph>
		<NumberedListItem number="1">
			Let’s begin with our&ensp;<em>internal alias</em>&ensp;example:&ensp;<Link
				type="alias"
				href="/high-level-discussion/rules-for-writing-good-slugs">Writing Good Snails</Link
			>. Stripping Notion’s HTML to its structural bones, we see that this link is rendered as:</NumberedListItem
		>
		<IndentGroup>
			<Code
				code={`&lt;a&gt;&lt;span&gt;Writing Good Snails&lt;/span&gt;&lt;/a&gt;`}
				language="html"
			/><Paragraph
				blockProps={{
					pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
					id: '056e44d0-c749-41d9-a978-7c73f2bbb64a',
					created_time: '2022-01-30T00:31:00.000Z',
					last_edited_time: '2022-01-30T00:31:00.000Z'
				}}
			>
				All well and good.
			</Paragraph>
		</IndentGroup>
		<NumberedListItem number="2">
			Now let’s add some internal emphasis:&ensp;<Link
				type="alias"
				href="/high-level-discussion/rules-for-writing-good-slugs">Writing&ensp;</Link
			><Link type="alias" href="/high-level-discussion/rules-for-writing-good-slugs"
				><em>Great!</em></Link
			><Link type="alias" href="/high-level-discussion/rules-for-writing-good-slugs"
				>&ensp;Snails</Link
			>. In Notion, this still appears, at first glance, to be a single link because the underlines
			touch.</NumberedListItem
		>
		<IndentGroup>
			<Image url="/assets/annotations/link/d45218c3-2429-4256-8d4d-9ca06e51cefb.png" caption="" />
			<Paragraph
				blockProps={{
					pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
					id: 'efcaf3e8-7a67-4a1f-8985-d644dba0ef63',
					created_time: '2022-01-30T00:33:00.000Z',
					last_edited_time: '2022-01-30T02:45:00.000Z'
				}}
			>
				Now take a look at the source again. If you were implementing this by hand, you’d write
				(again, just the structure)…
			</Paragraph>
			<Code
				code={`&lt;a&gt;
	&lt;span&gt;Writing &lt;/span&gt;
	&lt;span&gt;Great! &lt;/span&gt;
	&lt;span&gt;Snails&lt;/span&gt;
&lt;/a&gt;`}
				language="html">Makes sense, right? 🤷🏻</Code
			><Paragraph
				blockProps={{
					pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
					id: 'aacb614f-5064-432f-a70a-709e5b46d12d',
					created_time: '2022-01-30T02:51:00.000Z',
					last_edited_time: '2022-01-30T02:51:00.000Z'
				}}
			>
				…but here’s what Notion gets you:
			</Paragraph>
			<Code
				code={`&lt;a&gt;&lt;span&gt;Writing &lt;/span&gt;&lt;/a&gt;
&lt;a&gt;&lt;span&gt;Great! &lt;/span&gt;&lt;/a&gt;
&lt;a&gt;&lt;span&gt;Snails&lt;/span&gt;&lt;/a&gt;`}
				language="html"
				><em><strong>The cake is a lie!&ensp;</strong></em>🙀
			</Code>
		</IndentGroup>
		<Paragraph
			blockProps={{
				pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
				id: '9ca116e5-6eb8-4432-9709-9e4ba749bfaf',
				created_time: '2022-01-30T02:44:00.000Z',
				last_edited_time: '2022-01-30T06:32:00.000Z'
			}}
		>
			The same thing happens with external links. 😤
		</Paragraph>
		<Paragraph
			blockProps={{
				pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
				id: 'f10f8e4b-f778-40dd-89b1-05761c9a7c4e',
				created_time: '2022-01-30T06:32:00.000Z',
				last_edited_time: '2022-01-30T06:32:00.000Z'
			}}
		>
			If this bothers you, let Notion know. I don’t think my solo complaint is likely to move the
			needle on something that probably affects their entire stack. 😬
		</Paragraph>
		<Header level={3}>How this affects&ensp;<em>notion2svelte</em></Header>
		<Paragraph
			blockProps={{
				pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
				id: '52e26993-066d-4db7-a359-b5ccadf6db6d',
				created_time: '2022-01-30T06:33:00.000Z',
				last_edited_time: '2022-12-08T19:33:00.000Z'
			}}
		>
			I can see a future where I get sick of this situation and complicate&ensp;<em
				>notion2svelte</em
			>&ensp;by having it stitch together adjacent links if they share a target URL. In these early
			days, however, it’s just too much scope for this little tool, so this is the kind of thing
			you’re looking at if you decide to style a substring within a link.
		</Paragraph>
		<Paragraph
			blockProps={{
				pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
				id: 'e9382baf-5f52-4e2b-805d-e3d961ec3fe0',
				created_time: '2022-01-30T06:39:00.000Z',
				last_edited_time: '2022-01-30T06:40:00.000Z'
			}}
		/>
		<BulletedListItem
			>Internal alias with styled text:&ensp;<Link
				type="alias"
				href="/high-level-discussion/rules-for-writing-good-slugs">Writing&ensp;</Link
			><Link type="alias" href="/high-level-discussion/rules-for-writing-good-slugs"
				><InlineColor value="red">Great!</InlineColor></Link
			><Link type="alias" href="/high-level-discussion/rules-for-writing-good-slugs"
				>&ensp;Snails</Link
			></BulletedListItem
		>
		<BulletedListItem
			>External link with styled text:&ensp;<Link
				type="absolute"
				href="https://en.wikipedia.org/wiki/What_Are_Little_Boys_Made_Of%3F">Writing&ensp;</Link
			><Link type="absolute" href="https://en.wikipedia.org/wiki/What_Are_Little_Boys_Made_Of%3F"
				><InlineColor value="red">Great!</InlineColor></Link
			><Link type="absolute" href="https://en.wikipedia.org/wiki/What_Are_Little_Boys_Made_Of%3F"
				>&ensp;Puppy Dog Tales</Link
			></BulletedListItem
		>
		<Paragraph
			blockProps={{
				pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
				id: '853e84b3-8591-4b41-92e1-6287ac843801',
				created_time: '2022-01-29T22:34:00.000Z',
				last_edited_time: '2022-12-08T10:42:00.000Z'
			}}
		/>
		<Paragraph
			blockProps={{
				pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
				id: '3c09c0f8-5672-41d4-8dd8-3598b77aa309',
				created_time: '2022-01-29T22:34:00.000Z',
				last_edited_time: '2022-12-08T10:44:00.000Z'
			}}
		>
			If all you’re doing to style links is underline ‘em or change the font, you’ll probably
			notice&ensp;<em>none&ensp;</em>of this in practice. But if, like me, your link styles are
			inspired by&ensp;<Link type="absolute" href="https://practicaltypography.com/free-fonts.html"
				>Matthew Butterick</Link
			>, then links broken up by annotation formatting ends up looking broken. Oh well.
		</Paragraph>
		<Paragraph
			blockProps={{
				pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
				id: '637feeb4-3745-404d-932b-95ff5069c771',
				created_time: '2022-01-30T06:44:00.000Z',
				last_edited_time: '2022-01-30T06:44:00.000Z'
			}}
		/>
	</span></Toggle
><Paragraph
	blockProps={{
		pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
		id: '959bc12b-1758-4808-9e6c-b79e1e07f919',
		created_time: '2022-01-28T00:20:00.000Z',
		last_edited_time: '2022-01-28T00:20:00.000Z'
	}}
/>
<Divider />
<Header level={2}
	><Link type="alias" href="/about-notion2svelte">🏠</Link>&ensp;Browse the docs ⚘</Header
>
<ColumnList cols={2}
	><Column
		><Header level={3}>High-level Discussion</Header>
		<BulletedListItem
			><Link type="mention" href="/high-level-discussion/flow-diagram"
				>Where notion2svelte Fits</Link
			>&ensp;</BulletedListItem
		>
		<BulletedListItem><Link type="mention" href="/components">Components</Link></BulletedListItem>
		<BulletedListItem
			><Link type="mention" href="/high-level-discussion/rules-for-writing-good-slugs"
				>Writing Good Slugs</Link
			></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/high-level-discussion/block-props">blockProps</Link
			></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/high-level-discussion/nested-blocks">Nested Blocks</Link
			></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/high-level-discussion/synced-blocks">Synced Blocks</Link
			></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/high-level-discussion/dot-env">Configuring your .env</Link
			>&ensp;</BulletedListItem
		>
		<Header level={3}>Turn-intoable Block Components</Header>
		<BulletedListItem
			><Link type="mention" href="/standard-components/paragraph">Paragraph (aka “Text”)</Link
			></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/standard-components/header">Header</Link></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/standard-components/child-page">ChildPage</Link
			></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/standard-components/todo-item">TodoItem</Link></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/standard-components/bulleted-list-item">BulletedListItem</Link
			></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/standard-components/numbered-list-item">NumberedListItem</Link
			></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/standard-components/toggle">Toggle</Link></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/standard-components/code">Code</Link></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/standard-components/quote">Quote</Link></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/standard-components/callout">Callout</Link></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/standard-components/equation">Equation</Link></BulletedListItem
		>
		<BulletedListItem
			>Toggle Headings<InlineColor value="gray">&ensp;(not yet implemented)</InlineColor
			></BulletedListItem
		>
	</Column><Column
		><Header level={3}>Layout-only Components</Header>
		<BulletedListItem
			><Link type="mention" href="/layout-only-components/indent-group">IndentGroup</Link
			></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/layout-only-components/columns">Column & ColumnList</Link
			>&ensp;</BulletedListItem
		>
		<Header level={3}>Page-level Components</Header>
		<BulletedListItem
			><Link type="mention" href="/page-level-components/title">Title (aka Name)</Link
			></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/page-level-components/cover">Cover (Image & Icon)</Link
			></BulletedListItem
		>
		<Header level={3}>Annotation Components</Header>
		<BulletedListItem
			><strong>bold</strong>&ensp;→&ensp;<InlineCode
				code={'&lt;strong&gt;'}
			/>&ensp;</BulletedListItem
		>
		<BulletedListItem
			><em>italic</em>&ensp;→&ensp;<InlineCode code={'&lt;em&gt;'} /></BulletedListItem
		>
		<BulletedListItem
			><s>strikethrough</s>&ensp;→&ensp;<InlineCode code={'&lt;s&gt;'} /></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/annotations/underline">Underline</Link></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/annotations/inline-code">InlineCode</Link></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/annotations/inline-color">InlineColor</Link></BulletedListItem
		>
		<BulletedListItem><Link type="mention" href="/annotations/link">Link</Link></BulletedListItem>
		<BulletedListItem
			><Link type="mention" href="/standard-components/equation">Equation</Link></BulletedListItem
		>
		<Header level={3}>Other Components</Header>
		<BulletedListItem
			><Link type="mention" href="/other-components/divider">Divider</Link></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/other-components/embed">Embed</Link></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/other-components/image">Image</Link></BulletedListItem
		>
		<BulletedListItem
			><Link type="mention" href="/other-components/error">Error</Link></BulletedListItem
		>
	</Column></ColumnList
><Paragraph
	blockProps={{
		pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
		id: 'e1e71b2f-956d-4add-9d67-f4c3e6945324',
		created_time: '2022-01-30T06:29:00.000Z',
		last_edited_time: '2022-01-30T06:30:00.000Z'
	}}
>
	🧘🏾
</Paragraph>
<Paragraph
	blockProps={{
		pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
		id: '28583833-e30e-40bd-8a63-79c3dcaaf5fe',
		created_time: '2022-01-30T06:29:00.000Z',
		last_edited_time: '2022-01-30T06:30:00.000Z'
	}}
>
	<Link type="absolute" href="https://www.poetryfoundation.org/poems/47536/one-art"
		>https://www.poetryfoundation.org/poems/47536/one-art</Link
	>
</Paragraph>
<Paragraph
	blockProps={{
		pageId: '0a81110f311a4b2f858a65ea1a45ab3a',
		id: '6d19eae5-a2d8-46b7-bf19-0c0c86d9d459',
		created_time: '2022-01-30T10:25:00.000Z',
		last_edited_time: '2022-01-30T10:25:00.000Z'
	}}
>
	🖖🏽 Prosper.
</Paragraph>
