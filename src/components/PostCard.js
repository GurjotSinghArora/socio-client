import React, { useContext } from 'react';
import {Card, Image} from 'semantic-ui-react';
import moment from 'moment';
import LikeButton from './LikeButton';
import { AuthContext } from '../context/auth';
//import { Files } from "../Files";

function PostCard({post:{body,createdAt,id,username,likeCount,likes}}){
    const {user} = useContext(AuthContext);
   
    return(
    <Card fluid>
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header>{username}</Card.Header>
      <Card.Meta>
        <span className='date'>{moment(createdAt).fromNow()}</span>
      </Card.Meta>
      <Card.Description>
        {body}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
    <LikeButton user={user} post={{id, likes,likeCount}} />
    </Card.Content>
    </Card>
    )

}

export default PostCard;