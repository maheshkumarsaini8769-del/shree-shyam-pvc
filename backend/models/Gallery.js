const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  isRealWork: {
    type: Boolean,
    default: true
  },
  tag: {
    type: String,
    default: 'On-Site Installation'
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: {
    type: [String],
    default: []
  }
}, { timestamps: true });

GallerySchema.virtual('id').get(function() {
  return this._id.toHexString();
});
GallerySchema.set('toJSON', { virtuals: true });
GallerySchema.set('toObject', { virtuals: true });

module.exports = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
