import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';

import banner from '../assets/images/article_image.jpeg';

const useStyles = (theme) => ({
  root: {
    minHeight: 375,
    position: 'relative'
  },
  headings: {
    fontWeight: '600',
    fontSize: 20,
    textTransform: 'capitalize',
    height: 49,
    maxHeight: 49,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkitBoxOrient': 'vertical',
    '-webkitLineClamp': 2
  },
  editTitleInput: {
    width: '100%'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0
  },
  media: {
    width: '100%',
    height: 100
  },
  button: {
    fill: theme.palette.secondary.main
  }
});

const Articles = ({ id, title, body, classes, onSave }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setTitle] = useState('');
  const [newBody, setBody] = useState('');
  const [error, setError] = useState({});

  const onEditClick = () => {
    setIsEditing(true); // Enable to edit mode
    setTitle(title); // Set the title
    setBody(body);
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const onSaveClick = () => {
    if (!newTitle.trim()) {
      setError({ title: 'Please enter a title.' });
    }
    else if (!newBody.trim()) {
      setError({ body: 'Please enter a description.' });
    } else {
      if (newTitle !== title || newBody !== body) {
        onSave({ id, newTitle, newBody });
      }
      setIsEditing(false);
      setTitle(''); // On save remove the title from state
      setError(''); // On save remove the error message
      setBody('');
    }
  };

  const titleContent = isEditing ? (
    <div className={classes.postTitleInner}>
      <CardHeader
        title={
          <TextField
            className={classes.editTitleInput}
            value={newTitle}
            onChange={(e) => handleChange(e)}
            classes={{
              input: classes.editTitleInputRoot
            }}
            inputProps={{
              role: 'textbox',
              'data-testid': 'article-title'
            }}
            error={error.title}
            helperText={error && error.title}
          />
        }
      />

      <CardContent>
        <TextField
          multiline
          className={classes.editTitleInput}
          rowsMax={8}
          value={newBody}
          onChange={e => setBody(e.target.value)}
          inputProps={{
            role: 'textbox',
            'data-testid': 'article-body'
          }}
          error={error.body}
          helperText={error && error.body}

        />
      </CardContent>
      <Grid container justify="center" className={classes.buttonContainer}>
        <CardActions>
          <Button size="small" onClick={onSaveClick} data-testid="art-save-btn">
            <DoneIcon className={classes.button} />
          </Button>
        </CardActions>
      </Grid>

    </div>
  ) : (
      <div className={classes.postTitleInner}>
        <CardHeader
          title={
            <Typography gutterBottom variant="h5" component="h2" className={classes.headings} >
              {title}
            </Typography>
          }
        />
        <CardMedia
        className={classes.media}
        image={banner}
        title="Search App Banner"
      />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {body}
          </Typography>
        </CardContent>
        <Grid container justify="center" className={classes.buttonContainer}>
          <CardActions>
            <Button size="small" onClick={onEditClick} data-testid="art-edit-btn">
              <EditIcon className={classes.button} />
            </Button>
          </CardActions>
        </Grid>
      </div>
    );

  return (

    <Grid item xs={12} sm={6} md={4} role="listitem">
      <Card className={classes.root}>
        {titleContent}
      </Card>
    </Grid>
  );
}

export default (withStyles(useStyles)(Articles));