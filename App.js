import React, { useState } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import ContactForm from './components/ContactForm';
import ContactTable from './components/ContactTable';

const App = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleSave = () => {
    setSelectedContact(null); // Reset contact after saving
  };

  return (
    <Container>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contact Management
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ContactForm contact={selectedContact} onSave={handleSave} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ContactTable onEdit={setSelectedContact} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
