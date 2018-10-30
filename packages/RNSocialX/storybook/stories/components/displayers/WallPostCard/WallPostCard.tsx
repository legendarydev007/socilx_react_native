import { action } from '@storybook/addon-actions';
import { boolean, date, number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { WallPostCard } from '../../../../../src/components';
import { getTextMock } from '../../../../../src/mocks';
import { MediaTypeImage } from '../../../../../src/types';
import CenterView from '../../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator(withKnobs)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('WallPostCard', () => {
		const postText = text(
			'postText',
			'Here Ionut testing wall post card component in a Storybook\nMonday morning with 18 deg.',
		);
		const location = text('location', 'Timisoara');
		const timestamp = date('timestamp', new Date('October 17, 2017 04:55:00'));
		const ownerName = text('owner.name', 'Michael Foucault');
		const ownerAvatarURL = text('owner.avatarURL', 'https://avatars2.githubusercontent.com/u/2531');
		const currentUserAvatarURL = text(
			'currentUserAvatarURL',
			'https://avatars2.githubusercontent.com/u/239',
		);
		const governanceVersion = boolean('governanceVersion', false);
		const numberOfComments = number('numberOfComments', 2);
		const numberOfSuperLikes = number('numberOfSuperLikes', 2);
		const numberOfWalletCoins = number('numberOfWalletCoins', 2);
		const likedByMe = boolean('likedByMe', false);
		const canDelete = boolean('canDelete', false);
		const listLoading = boolean('listLoading', false);
		const contentOffensive = boolean('listLoading', true);

		return (
			<WallPostCard
				contentOffensive={contentOffensive}
				getText={getTextMock}
				marginBottom={0}
				id="test_post_id"
				postText={postText}
				location={location}
				taggedFriends={[{ fullName: 'Stanley Sater' }, { fullName: 'Yolonda Rodda' }]}
				timestamp={timestamp}
				owner={{
					userId: 'user_id_test',
					fullName: ownerName,
					avatarURL: ownerAvatarURL,
				}}
				currentUserAvatarURL={currentUserAvatarURL}
				governanceVersion={governanceVersion}
				numberOfComments={numberOfComments}
				numberOfSuperLikes={numberOfSuperLikes}
				numberOfWalletCoins={numberOfWalletCoins}
				onImagePress={action('onImagePress')}
				onLikeButtonPress={() => false}
				onDeletePress={action('onDeletePress')}
				onUserPress={action('onUserPress')}
				onCommentPress={action('onCommentPress')}
				onAddComment={action('onAddComment')}
				likedByMe={likedByMe}
				canDelete={canDelete}
				media={[
					{
						url: 'https://avatars2.githubusercontent.com/u/538',
						hash: '389201u509jkafg890u7025@534',
						type: MediaTypeImage,
						extension: 'jpg',
						size: 9966453,
						numberOfComments: 2,
						numberOfLikes: 11,
					},
				]}
				likes={[
					{
						userId: 'like_user_1',
						userName: 'username1',
					},
				]}
				bestComments={[
					{
						id: 'comm1',
						text: 'Sample comment no. 1',
						likes: [{ userId: 'user2', userName: 'userName2' }],
						owner: { userName: 'ionut_socx_0', userId: 'user1' },
					},
					{
						id: 'comm2',
						text: 'Some very long comment that should span on multiple lines',
						likes: [{ userId: 'user3', userName: 'userName3' }],
						owner: { userName: 'ionut_socx_2', userId: 'user4' },
					},
				]}
				listLoading={listLoading}
				suggested={undefined}
				noInput={false}
				onSubmitComment={action('onSubmitComment')}
				onBlockUser={action('onBlockUser')}
				onReportProblem={action('onReportProblem')}
			/>
		);
	});
