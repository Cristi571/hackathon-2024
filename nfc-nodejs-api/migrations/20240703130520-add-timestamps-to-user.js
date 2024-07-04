module.exports = {
    async up(db, client) {
      // Update 'users' collection
      await db.collection('users').updateMany({}, {
        $set: {
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      await db.collection('users').createIndex({ "createdAt": 1 });
      await db.collection('users').createIndex({ "updatedAt": 1 });
  
      // Update 'userconnections' collection
      await db.collection('userconnections').updateMany({}, {
        $set: {
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      await db.collection('userconnections').createIndex({ "createdAt": 1 });
      await db.collection('userconnections').createIndex({ "updatedAt": 1 });
    },
  
    async down(db, client) {
      // Revert changes in 'users' collection
      await db.collection('users').updateMany({}, {
        $unset: {
          createdAt: "",
          updatedAt: ""
        }
      });
      await db.collection('users').dropIndex({ "createdAt": 1 });
      await db.collection('users').dropIndex({ "updatedAt": 1 });
  
      // Revert changes in 'userconnections' collection
      await db.collection('userconnections').updateMany({}, {
        $unset: {
          createdAt: "",
          updatedAt: ""
        }
      });
      await db.collection('userconnections').dropIndex({ "createdAt": 1 });
      await db.collection('userconnections').dropIndex({ "updatedAt": 1 });
    }
  };
