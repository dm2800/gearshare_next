//how to structure data for app

const userData = {
    userId: 'user123',
    items: [
      {
        itemId: 'item1',
        itemName: 'Item 1',
        interestedBuyers: [
          {
            buyerId: 'buyer1',
            messages: [
              { sender: 'buyer1', content: 'Hello' },
              { sender: 'user123', content: 'Hi there' },
              // ... other messages
            ],
          },
          // ... other interested buyers for item1
        ],
      },
      {
        itemId: 'item2',
        itemName: 'Item 2',
        interestedBuyers: [
          // ... interested buyers for item2
        ],
      },
      // ... other items
    ],
  };
  