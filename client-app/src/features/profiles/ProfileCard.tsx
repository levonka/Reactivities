import { IProfile } from '../../app/models/profile';
import { observer } from 'mobx-react-lite';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface Props {
    profile: IProfile;
}

export default observer(function ProfileCard({ profile }: Props) {
    return (
        <Card as={Link} to={`/profiles/${profile.username}`}>
            <Image src={profile.image || '/assets/user.png'} />
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>{profile.bio}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name="user" />
                20 followers
            </Card.Content>
        </Card>
    );
});
