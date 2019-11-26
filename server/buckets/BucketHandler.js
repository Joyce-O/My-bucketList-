import db from "../models/index";

export default class BucketHandler {
  static async addBucket(request, response) {
    try {
      const data = await db.bucket.create({
        name: request.body.name,
        created_by: request.user.id
      });

      return response.status(200).json({
        status: 200,
        data
      });
    } catch (err) {
      response.status(500).json({
        status: 500,
        error: "unexpected server error"
      });
    }
  }

  static async addItem(request, response) {
    try {
      const data = await db.items.create({
        name: request.body.name,
        parent_id: request.params.id
      });
      return response.status(200).json({
        status: 200,
        data
      });
    } catch (err) {
      response.status(500).json({
        status: 500,
        error: "unexpected server error"
      });
    }
  }

  static async updateBucket(request, response) {
    try {
      const body = request.body;
      const data = await db.bucket.update(body, {
        where: {
          id: request.params.id
        }
      });
      if (data[0] === 0) {
        return response.status(404).json({
          status: 404,
          error: "Resource not found"
        });
      }
      return response.status(200).json({
        status: 200,
        data
      });
    } catch (err) {
      response.status(500).json({
        status: 500,
        error: "unexpected server error"
      });
    }
  }

  static async getBuckets(request, response) {
    try {
      const data = await db.bucket.findAll({
        // attributes: ['name'],
        include: [
          {
            model: db.items,
            as: "bucketItems"
          }
        ],
        where: { created_by: request.user.id },
        order: [["createdAt", "DESC"]]
      });
      if (!data) {
        return response.status(404).json({
          status: 404,
          error: "Resource not found"
        });
      }
      return response.status(200).json({
        status: 200,
        data
      });
    } catch (err) {
      response.status(500).json({
        status: 500,
        error: "unexpected server error"
      });
    }
  }

  static async getABucket(request, response) {
    try {
      const data = await db.bucket.findOne({
        include: [
          {
            model: db.items,
            as: "bucketItems"
          }
        ],
        where: { created_by: request.user.id, id: request.params.id }
      });
      if (!data) {
        return response.status(404).json({
          status: 404,
          error: "Resource not found"
        });
      }
      return response.status(200).json({
        status: 200,
        data
      });
    } catch (err) {
      response.status(500).json({
        status: 500,
        error: "unexpected server error"
      });
    }
  }

  static async deleteABucket(request, response) {
    try {
      const bucketId = await db.bucket.findByPk(request.params.id);
      if (!bucketId) {
        return response.status(404).json({
          status: 404,
          error: "Resource not found"
        });
      }

      if (request.user.id === bucketId.created_by) {
        await db.bucket.destroy({
          where: { id: request.params.id }
        });
        return response.status(200).json({
          status: 200,
          message: "Resource was deleted successfully"
        });
      }
      else{
        return response.status(401).json({
          status: 401,
          message: "You are not authorized to delete this resource"
        });
      }
    } catch (err) {
      response.status(500).json({
        status: 500,
        error: "unexpected server error"
      });
    }
  }

  static async deleteAnItem(request, response) {
    try {
      const bucketId = await db.bucket.findByPk(request.params.parent_id);
      if (!bucketId) {
        return response.status(404).json({
          status: 404,
          error: "Resource not found"
        });
      }

      const itemId = await db.items.findByPk(request.params.id);
      if (!itemId) {
        return response.status(404).json({
          status: 404,
          error: "Resource not found"
        });
      }

      if (request.user.id === bucketId.created_by) {
        await db.items.destroy({
          where: { parent_id: request.params.parent_id, id: request.params.id }
        });
        return response.status(200).json({
          status: 200,
          message: "Resource was deleted successfully"
        });
      }
      else{
        return response.status(401).json({
          status: 401,
          message: "You are not authorized to delete this resource"
        });
      }
    } catch (err) {
      response.status(500).json({
        status: 500,
        error: "unexpected server error"
      });
    }
  }

  static async getItems(request, response) {
    try {
      const data = await db.items.findAll({
        where: { parent_id: request.params.id },
        order: [["createdAt", "DESC"]]
      });
      if (!data) {
        return response.status(404).json({
          status: 404,
          error: "Resource not found"
        });
      }
      return response.status(200).json({
        status: 200,
        data
      });
    } catch (err) {
      response.status(500).json({
        status: 500,
        error: "unexpected server error"
      });
    }
  }

  static async getAnItem(request, response) {
    console.log(request.params);
    try {
      const data = await db.items.findOne({
        where: {
          parent_id: request.params.bucketId,
          id: request.params.id
        }
      });
      if (!data) {
        return response.status(404).json({
          status: 404,
          error: "Item not found"
        });
      }
      return response.status(200).json({
        status: 200,
        data
      });
    } catch (err) {
      response.status(500).json({
        status: 500,
        error: "unexpected server error"
      });
    }
  }

  static async updateAnItem(request, response) {
    try {
      const body = request.body;
      // console.log(updates);
      const data = await db.items.update(body, {
        where: {
          parent_id: request.params.bucketId,
          id: request.params.id
        }
      });
      console.log("data", data);
      if (!data) {
        return response.status(404).json({
          status: 404,
          error: "Item not found"
        });
      }
      return response.status(200).json({
        status: 200,
        data
      });
    } catch (err) {
      response.status(500).json({
        status: 500,
        error: "unexpected server error"
      });
    }
  }
}
