// ----- Imports ----- //

import { Display, Pillar } from '@guardian/types/Format';
import { boolean, radios, withKnobs } from '@storybook/addon-knobs';
import {
	advertisementFeature,
	analysis,
	article,
	feature,
	review,
} from 'fixtures/item';
import React from 'react';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import Headline from './headline';

// ----- Setup ----- //

const starRating: Record<number, number> = [0, 1, 2, 3, 4, 5];

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Headline
		item={{
			...article,
			display: boolean('Immersive', false)
				? Display.Immersive
				: Display.Standard,
		}}
	/>
);

const Analysis = (): ReactElement => (
	<Headline
		item={{
			...analysis,
			display: boolean('Immersive', false)
				? Display.Immersive
				: Display.Standard,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Feature = (): ReactElement => (
	<Headline
		item={{
			...feature,
			display: boolean('Immersive', false)
				? Display.Immersive
				: Display.Standard,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Review = (): ReactElement => (
	<Headline
		item={{
			...review,
			starRating: radios('Rating', starRating, 3),
			display: boolean('Immersive', false)
				? Display.Immersive
				: Display.Standard,
		}}
	/>
);

const Labs = (): ReactElement => (
	<Headline
		item={{
			...advertisementFeature,
			display: Display.Standard,
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: Headline,
	title: 'Headline',
	decorators: [withKnobs],
};

export { Default, Analysis, Feature, Review, Labs };
