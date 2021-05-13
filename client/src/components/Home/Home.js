import { Container, Grid, Grow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../actions/postsActions";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import useStyles from "./styles";

const Home = () => {
  const [currentPostId, setCurrentPostId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={7}>
            <Posts setCurrentPostId={setCurrentPostId} />
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <Form currentPostId={currentPostId} setCurrentPostId={setCurrentPostId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
