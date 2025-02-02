import cron from 'node-cron';
import BannersRepo from '../repositories/banners.repo';

// Schedule a task to run every hour
cron.schedule('0 0 * * *', async () => {
  try {
    await BannersRepo.deleteBanners();
  } catch (error) {
    console.error('Error deleting expired banners:', error);
  }
});
