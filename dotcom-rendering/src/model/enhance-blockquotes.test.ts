import { ArticleDesign, type ArticleFormat } from '@guardian/libs';
import { Standard as ExampleArticle } from '../../fixtures/generated/articles/Standard';
import { blockMetaData } from '../../fixtures/manual/block-meta-data';
import { decideFormat } from '../lib/decideFormat';
import type { DCRArticle } from '../types/frontend';
import { enhanceBlockquotes } from './enhance-blockquotes';

const example: DCRArticle = ExampleArticle;
const exampleFormat: ArticleFormat = decideFormat(example.format);

const formatIsPhotoEssay: ArticleFormat = {
	...exampleFormat,
	design: ArticleDesign.PhotoEssay,
};

describe('Enhancing blockquotes', () => {
	it('creates an identical but new object when no changes are needed', () => {
		expect(enhanceBlockquotes(example.blocks, exampleFormat)).not.toBe(
			example.blocks,
		); // We created a new object
		expect(enhanceBlockquotes(example.blocks, exampleFormat)).toEqual(
			example.blocks,
		); // The new object is what we expect
	});

	it('adds the quoted prop when the quoted class was found', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
						elementId: 'mockId',
						html: '<blockquote class="quoted">This is a quote</blockquote>',
					},
				],
			},
		];

		const expectedOutput = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
						elementId: 'mockId',
						html: '<blockquote class="quoted">This is a quote</blockquote>',
						quoted: true,
					},
				],
			},
		];

		expect(enhanceBlockquotes(input, exampleFormat)).toEqual(
			expectedOutput,
		);
	});

	it('transforms simple blockquotes to highlight elements for photo essays', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
						elementId: 'mockId',
						html: '<blockquote>This is not a quote</blockquote>',
					},
				],
			},
		];

		const expectedOutput = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.HighlightBlockElement',
						elementId: 'mockId',
						html: '<blockquote>This is not a quote</blockquote>',
					},
				],
			},
		];

		expect(enhanceBlockquotes(input, formatIsPhotoEssay)).toEqual(
			expectedOutput,
		);
	});

	it("doesn't transform quoted blockquotes to highlight elements for photo essays", () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
						elementId: 'mockId',
						html: '<blockquote class="quoted">This is a quoted blockquote</blockquote>',
					},
				],
			},
		];

		const expectedOutput = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
						elementId: 'mockId',
						html: '<blockquote class="quoted">This is a quoted blockquote</blockquote>',
						quoted: true,
					},
				],
			},
		];

		expect(enhanceBlockquotes(input, formatIsPhotoEssay)).toEqual(
			expectedOutput,
		);
	});

	it('passes through simple blockquotes', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
						elementId: 'mockId',
						html: '<blockquote>This is a quote</blockquote>',
					},
				],
			},
		];

		const expectedOutput = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
						elementId: 'mockId',
						html: '<blockquote>This is a quote</blockquote>',
					},
				],
			},
		];

		expect(enhanceBlockquotes(input, exampleFormat)).toEqual(
			expectedOutput,
		);
	});

	it('ignores blockquotes with other classnames', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
						elementId: 'mockId',
						html: '<blockquote class="somethingelse">This is a simple blockquote</blockquote>',
					},
				],
			},
		];

		const expectedOutput = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
						elementId: 'mockId',
						html: '<blockquote class="somethingelse">This is a simple blockquote</blockquote>',
					},
				],
			},
		];

		expect(enhanceBlockquotes(input, exampleFormat)).toEqual(
			expectedOutput,
		);
	});

	it('handles both quoted and simple blockquotes in the same array', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
						elementId: 'mockId',
						html: '<blockquote class="quoted">This is a quoted quote</blockquote>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
						elementId: 'mockId',
						html: '<blockquote>This is a simple quote</blockquote>',
					},
				],
			},
		];

		const expectedOutput = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
						elementId: 'mockId',
						html: '<blockquote class="quoted">This is a quoted quote</blockquote>',
						quoted: true,
					},
					{
						_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
						elementId: 'mockId',
						html: '<blockquote>This is a simple quote</blockquote>',
					},
				],
			},
		];

		expect(enhanceBlockquotes(input, exampleFormat)).toEqual(
			expectedOutput,
		);
	});
});
