<script>
	import { Tabs, TabList, TabPanel, Tab } from './tab.js';
</script>

<Tabs>
	<TabList>
		<Tab>Home</Tab>
		<Tab>two</Tab>
		<Tab>three</Tab>
	</TabList>

	<TabPanel>
		<slot name="master"/>
	</TabPanel>

	<TabPanel>
		<slot name="second"/>
	</TabPanel>

	<TabPanel>
		<h2>Third panel</h2>
	</TabPanel>
</Tabs>

