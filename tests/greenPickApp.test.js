const request = require("supertest");
const app = require("../main");
const mongoDB = require("mongoose");
const EcopicksBrand = require("../models/ecopicksBrand");

describe("Test the ecopicksAppController", () => {
  beforeAll(() => {
    mongoDB.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll((done) => {
    mongoDB.disconnect(done);
  });

  test("Add ecopicks app", () => {
    const newGreenPickApp = { "category": "shopping", "name": "Stefi", "website": "www.example.com", "slogan": "Short Slogan", "description": "This is a description." };
    const testApp = new EcopicksBrand(newGreenPickApp);

    testApp.save()
      .then(() => {
        EcopicksBrand.find({})
          .then(result => {
            expect(result.length).toBe(1);
            expect(result[0]).toHaveProperty('_id');
          });
      })
      .catch((error) => {
        return error.message;
      });
  });

  test("Edit GreenPick app", () => {
    EcopicksBrand.find({})
      .then(result => {
        let updatedName = "Updated name";
        EcopicksBrand.findByIdAndUpdate(result[0]._id, {
          $set: { name: updatedName }
        }, { new: true }).then(updatedApp => {
          expect(updatedApp.name).toBe(updatedName);
        });
      })
  });

  test("Request details page", () => {
    EcopicksBrand.find({})
      .then(result => {
        request(app)
          .get(`/brand/${result[0]._id}`)
          .expect(200);
      }).catch(error => {
        throw error;
      });
  });

  test("Delete GreenPick app", () => {
    EcopicksBrand.find({})
      .then(result => {
        EcopicksBrand.findByIdAndRemove(result[0]._id)
          .then(() => {
            EcopicksBrand.find({})
              .then(docs => {
                expect(docs.length).toBe(0);
              });
          })
      });
  });

});
