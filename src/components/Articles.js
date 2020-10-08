import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';

const useStyles = () => ({
  root: {
    minHeight: 375
  },
  headings: {
    fontWeight: '600',
    fontSize: '20px',
    textTransform: 'capitalize'
  },
  editTitleInput: {
    width: '100%'
  }
});

const Articles = ({ id, title, body, classes, onSave }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setTitle] = useState('');
  const [newBody, setBody] = useState('');
  const [error, setError] = useState('');

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
      setError('Please enter a title.');
    } else {
      if (newTitle !== title || newBody !== body) {
        onSave({ id, newTitle, newBody });
      }
      setIsEditing(false);
      setTitle(''); // On save remove the title from state
      setError(''); // On save remove the error message
      setBody();
    }
  };

  const titleContent = isEditing ? (
    <div className={classes.postTitleInner}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <DoneIcon
              role="button"
              onClick={onSaveClick}
            />
          </IconButton>
        }
        title={
          <TextField
            className={classes.editTitleInput}
            value={newTitle}
            onChange={(e) => handleChange(e)}
            classes={{
              input: classes.editTitleInputRoot,
            }}
            inputProps={{
              role: 'textbox',
            }}
            error={error}
            helperText={error && error}
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
          }}
        />
        </CardContent>

    </div>
  ) : (
      <div className={classes.postTitleInner}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <EditIcon
                onClick={onEditClick}
              />
            </IconButton>
          }
          title={
            <Typography gutterBottom variant="h5" component="h2" className={classes.headings} >
              {title}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {body}
          </Typography>
        </CardContent>
      </div>
    );

  return (

    <Grid item xs={12} sm={4} role="listitem">
      <Card className={classes.root}>
        {titleContent}
      </Card>
    </Grid>
  );
}

export default (withStyles(useStyles)(Articles));