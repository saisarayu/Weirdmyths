// In routes/entities.js
router.get("/by-user/:userId", async (req, res) => {
    const { userId }= req.params;
    try {
      const entities = await Entity.find({ created_by: userId }).populate("created_by");
      res.json(entities);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch entities." });
    }
  });

  