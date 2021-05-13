import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/postsActions";
import useStyles from "./styles";

const Form = ({ currentPostId, setCurrentPostId }) => {
  const [postData, setPostData] = useState({ title: "", message: "", tags: "", selectedFile: "" });
  const post = useSelector((state) => (currentPostId ? state.posts.find((message) => message._id === currentPostId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) {
      setPostData(post);
      if (post?.title) {
        document.querySelector("#post-title").focus();
      }
    }
  }, [post]);

  const handleClear = () => {
    setCurrentPostId(0);
    setPostData({ title: "", message: "", tags: "", selectedFile: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentPostId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      handleClear();
    } else {
      dispatch(updatePost(currentPostId, { ...postData, name: user?.result?.name }));
      handleClear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentPostId ? `Editing "${post.title}"` : "Creating a Memory"}</Typography>
        <TextField
          id="post-title"
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          required
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          required
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (comma separated)"
          fullWidth
          required
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
        />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={handleClear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
