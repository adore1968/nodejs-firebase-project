import db from '../firebase.js';

export const createContact = async (req, res) => {
  try {
    const data = req.body;
    const result = await db.collection('contacts').add(data);
    const doc = await result.get();
    return res.status(201).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contactsRef = db.collection('contacts');
    const snapshot = await contactsRef.get();
    return res.json(
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getContact = async (req, res) => {
  try {
    const contactRef = db.collection('contacts').doc(req.params.id);
    const doc = await contactRef.get();
    if (!doc.exists) {
      return res.sendStatus(404);
    }
    return res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const data = req.body;
    const contactRef = db.collection('contacts').doc(req.params.id);
    await contactRef.update(data);
    const doc = await contactRef.get();
    return res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    await db.collection('contacts').doc(req.params.id).delete();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
