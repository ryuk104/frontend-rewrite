import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import HardBreak from '@tiptap/extension-hard-break';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import Typography from '@tiptap/extension-typography';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import suggestion from './suggestion';
import Slash from './slash-command';
import { ChartExtension } from './SvelteExtension';

export const defaultExtensions = [
	Document,
	Paragraph,
	Text,
	Heading,
	Bold,
	Italic,
	Underline,
	Strike,
	Blockquote,
	BulletList,
	HardBreak,
	HorizontalRule,
	ListItem,
	OrderedList,
	Dropcursor,
	Gapcursor,
	Typography,
	TaskList,
	TaskItem,
	TextAlign,
	Placeholder,
	Image,
	Link,
	ChartExtension,
	Slash.configure({
		suggestion
	})
];

//
