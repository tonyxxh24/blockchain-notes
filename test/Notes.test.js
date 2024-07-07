const Notes = artifacts.require("Notes");

contract("Notes", (accounts) => {
  let notesContract;

  before(async () => {
    notesContract = await Notes.deployed();
  });

  it("should create a note", async () => {
    await notesContract.createNote("Test note", { from: accounts[0] });
    const count = await notesContract.getNoteCount({ from: accounts[0] });
    assert.equal(count, 1, "Note count should be 1");
  });

  it("should update a note", async () => {
    await notesContract.updateNote(0, "Updated test note", { from: accounts[0] });
    const [content, ] = await notesContract.getNote(0, { from: accounts[0] });
    assert.equal(content, "Updated test note", "Note content should be updated");
  });

  it("should delete a note", async () => {
    await notesContract.deleteNote(0, { from: accounts[0] });
    const count = await notesContract.getNoteCount({ from: accounts[0] });
    assert.equal(count, 0, "Note count should be 0 after deletion");
  });
});