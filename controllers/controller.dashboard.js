const dashboardModel = require('../models/model.dashboard');

const readAllGrnsForCurrentYear = async (req, res) => {
  try {
    const data = await dashboardModel.getAllGrnsForCurrentYear();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching GRNs:', err);
    res.status(500).json({ error: 'Error occured while read!' });
  }
};

const readAllInvoicesForCurrentYear = async (req, res) => {
  try {
    const data = await dashboardModel.getAllInvoicesForCurrentYear();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching GRNs:', err);
    res.status(500).json({ error: 'Error occured while read!' });
  }
};

const readTopSellingItems = async (req, res) => {
  try {
    const data = await dashboardModel.getTopSellingItems();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching top selling items:', err);
    res.status(500).json({ error: 'Error occured while read!' });
  }
};

const readMonthlyGrnCount = async (req, res) => {
  try {
    const data = await dashboardModel.getMonthlyGRNCount();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching invoice count:', err);
    res.status(500).json({ error: 'Error occured while read!' });
  }
};

const readMonthlyInvoiceCount = async (req, res) => {
  try {
    const data = await dashboardModel.getMonthlyInvoiceCount();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching invoice count:', err);
    res.status(500).json({ error: 'Error occured while read!' });
  }
};

module.exports = { readAllGrnsForCurrentYear, readAllInvoicesForCurrentYear, readTopSellingItems, readMonthlyGrnCount, readMonthlyInvoiceCount };