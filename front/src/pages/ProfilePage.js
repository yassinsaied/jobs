// @react hooks
import { useEffect } from 'react';

// @redux
import { useSelector, useDispatch } from 'react-redux';

// @mui
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Box,
  Link,
} from '@mui/material';

import { GitHub, Instagram, Facebook, LinkedIn, YouTube } from '@mui/icons-material';

// @actions

import { myProfileAction } from '../store/actions/profileAction';

export default function ProfilePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myProfileAction());
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);
  const { currentProfile } = useSelector((state) => state.profile);

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={2}>
        <Grid item lg={4}>
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CardMedia
                component="img"
                height="150"
                image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                sx={{ borderRadius: '50%' }}
              />
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                {currentProfile.status}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 4 }}>
                {currentProfile.company}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Button variant="contained" color="primary">
                  Follow
                </Button>
                <Button variant="outlined" color="primary" sx={{ ml: 1 }}>
                  Message
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <List sx={{ p: 0 }}>
                <ListItem disablePadding component={Link} href={currentProfile.sociale.github} target="_blank">
                  <ListItemIcon>
                    <GitHub />
                  </ListItemIcon>
                  <ListItemText primary={`@${user.name}`} />
                </ListItem>
                <ListItem disablePadding component={Link} href={currentProfile.sociale.linkidin} target="_blank">
                  <ListItemIcon>
                    <LinkedIn style={{ color: '#55acee' }} />
                  </ListItemIcon>
                  <ListItemText primary={`@${user.name}`} />
                </ListItem>
                <ListItem disablePadding component={Link} href={currentProfile.sociale.linkidin} target="_blank">
                  <ListItemIcon>
                    <Instagram style={{ color: '#ac2bac' }} />
                  </ListItemIcon>
                  <ListItemText primary={`@${user.name}`} />
                </ListItem>
                <ListItem disablePadding component={Link} href={currentProfile.sociale.linkidin} target="_blank">
                  <ListItemIcon>
                    <Facebook style={{ color: '#3b5998' }} />
                  </ListItemIcon>
                  <ListItemText primary={`@${user.name}`} />
                </ListItem>
                <ListItem disablePadding component={Link} href={currentProfile.sociale.youtube} target="_blank">
                  <ListItemIcon>
                    <YouTube style={{ color: '#3b5998' }} />
                  </ListItemIcon>
                  <ListItemText primary={`@${user.name}`} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={8}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="body1">Full Name</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body2" color="textSecondary">
                    {user.name}
                  </Typography>
                </Grid>
              </Grid>
              <hr />
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="body1">Email</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body2" color="textSecondary">
                    {user.email}
                  </Typography>
                </Grid>
              </Grid>
              <hr />
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="body1">Phone</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body2" color="textSecondary">
                    (097) 234-5678
                  </Typography>
                </Grid>
              </Grid>
              <hr />
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="body1">Mobile</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body2" color="textSecondary">
                    (098) 765-4321
                  </Typography>
                </Grid>
              </Grid>
              <hr />
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="body1">Address</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body2" color="textSecondary">
                    {currentProfile.location}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Grid container spacing={2}>
            <Grid item md={6}>
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="body2" sx={{ mb: 4 }}>
                    <span style={{ color: '#1976D2', fontStyle: 'italic', marginRight: '4px' }}>Assignment</span>{' '}
                    Project Status
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Web Design
                  </Typography>
                  <LinearProgress variant="determinate" value={80} sx={{ borderRadius: '20px' }} />
                  <Typography variant="body2" sx={{ mt: 4, mb: 1 }}>
                    Website Markup
                  </Typography>
                  <LinearProgress variant="determinate" value={72} sx={{ borderRadius: '20px' }} />
                  <Typography variant="body2" sx={{ mt: 4, mb: 1 }}>
                    One Page
                  </Typography>
                  <LinearProgress variant="determinate" value={89} sx={{ borderRadius: '20px' }} />
                  <Typography variant="body2" sx={{ mt: 4, mb: 1 }}>
                    Mobile Template
                  </Typography>
                  <LinearProgress variant="determinate" value={55} sx={{ borderRadius: '20px' }} />
                  <Typography variant="body2" sx={{ mt: 4, mb: 1 }}>
                    Backend API
                  </Typography>
                  <LinearProgress variant="determinate" value={66} sx={{ borderRadius: '20px' }} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={6}>
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="body2" sx={{ mb: 4 }}>
                    <span style={{ color: '#1976D2', fontStyle: 'italic', marginRight: '4px' }}>Assignment</span>{' '}
                    Project Status
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Web Design
                  </Typography>
                  <LinearProgress variant="determinate" value={80} sx={{ borderRadius: '20px' }} />
                  <Typography variant="body2" sx={{ mt: 4, mb: 1 }}>
                    Website Markup
                  </Typography>
                  <LinearProgress variant="determinate" value={72} sx={{ borderRadius: '20px' }} />
                  <Typography variant="body2" sx={{ mt: 4, mb: 1 }}>
                    One Page
                  </Typography>
                  <LinearProgress variant="determinate" value={89} sx={{ borderRadius: '20px' }} />
                  <Typography variant="body2" sx={{ mt: 4, mb: 1 }}>
                    Mobile Template
                  </Typography>
                  <LinearProgress variant="determinate" value={55} sx={{ borderRadius: '20px' }} />
                  <Typography variant="body2" sx={{ mt: 4, mb: 1 }}>
                    Backend API
                  </Typography>
                  <LinearProgress variant="determinate" value={66} sx={{ borderRadius: '20px' }} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={6}>
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="body2" sx={{ mb: 4 }}>
                    <span style={{ color: '#1976D2', fontStyle: 'italic', marginRight: '4px' }}>Assignment</span>{' '}
                    Project Status
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Web Design
                  </Typography>
                  <LinearProgress variant="determinate" value={80} sx={{ borderRadius: '20px' }} />
                  <Typography variant="body2" sx={{ mt: 4, mb: 1 }}>
                    Website Markup
                  </Typography>
                  <LinearProgress variant="determinate" value={72} sx={{ borderRadius: '20px' }} />
                  <Typography variant="body2" sx={{ mt: 4, mb: 1 }}>
                    One Page
                  </Typography>
                  <LinearProgress variant="determinate" value={89} sx={{ borderRadius: '20px' }} />
                  <Typography variant="body2" sx={{ mt: 4, mb: 1 }}>
                    Mobile Template
                  </Typography>
                  <LinearProgress variant="determinate" value={55} sx={{ borderRadius: '20px' }} />
                  <Typography variant="body2" sx={{ mt: 4, mb: 1 }}>
                    Backend API
                  </Typography>
                  <LinearProgress variant="determinate" value={66} sx={{ borderRadius: '20px' }} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
