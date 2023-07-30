import React, { useState } from 'react';
import { Typography, Card, CardContent, CardMedia, Modal } from '@mui/material';

// Sample data for items (you can replace it with your actual data)
const itemsData = [
  {
    id: 1,
    name: 'Item 1',
    description: 'Description of Item 1',
    imageUrl:
      'https://e7.pngegg.com/pngimages/879/858/png-clipart-smartphone-iphone-mobile-marketing-telecommunication-computer-smartphone-gadget-electronics.png',
  },
  {
    id: 2,
    name: 'Item 2',
    description: 'Description of Item 2',
    imageUrl:
      'https://www.freepnglogos.com/uploads/laptop-png/laptop-transparent-png-pictures-icons-and-png-40.png',
  },
  // Add more items here
];

const WelcomePage = ({ username }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <Typography variant="h4" align="center">
        Welcome, {username}!
      </Typography>

      {/* Display Cards of Items */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {itemsData.map((item) => (
          <Card
            key={item.id}
            onClick={() => handleCardClick(item)}
            sx={{ maxWidth: 200 }}
          >
            <CardMedia
              component="img"
              height="150"
              image={item.imageUrl}
              alt={item.name}
            />
            <CardContent>
              <Typography variant="body2">{item.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal to display item information */}
      <Modal open={selectedItem !== null} onClose={handleCloseModal}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            outline: 'none',
          }}
        >
          {selectedItem && (
            <Card sx={{ maxWidth: 400 }}>
              <CardMedia
                component="img"
                height="200"
                image={selectedItem.imageUrl}
                alt={selectedItem.name}
              />
              <CardContent>
                <Typography variant="h6">{selectedItem.name}</Typography>
                <Typography variant="body1">
                  {selectedItem.description}
                </Typography>
              </CardContent>
            </Card>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default WelcomePage;
