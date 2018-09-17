import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {BestComments} from '../../../../../src/components/displayers/WallPostCard';
import CenterView from '../../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('BestComments', () => (
		<BestComments
			bestComments={[
				{
					id: 'comm1',
					text: 'Sample comment no. 1',
					likes: [{userId: 'user2'}],
					owner: {userName: 'ionut_socx_0', userId: 'user1'},
				},
				{
					id: 'comm2',
					text: 'Some very long comment that should span on multiple lines',
					likes: [{userId: 'user3'}],
					owner: {userName: 'ionut_socx_2', userId: 'user4'},
				},
			]}
			onUserPress={(userId: string) => console.log('onUserPress: ' + userId)}
			onCommentPress={(start: boolean) => console.log('onCommentPress: ' + start)}
		/>
	));