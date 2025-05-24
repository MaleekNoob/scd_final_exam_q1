const Profile = require('../models/Profile');

exports.updateProfile = async (req, res) => {
  const { bio, avatar } = req.body;
  try {

    let profile = await Profile.findOne({ userId: req.user.id });
    
    if (profile) {
  
      if (bio !== undefined) profile.bio = bio;
      if (avatar !== undefined) profile.avatar = avatar;
      profile.updatedAt = Date.now();
    } else {
  
      profile = new Profile({
        userId: req.user.id,
        bio: bio || '',
        avatar: avatar || ''
      });
    }
    
    await profile.save();
    res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
