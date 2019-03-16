var express = require("express");
var router = express.Router();
var { Post, User, Reply } = require("../models");

router.get("/", function(req, res, next) {
  Post.findAll({}).then(result => {
    var loopIndex = 0;

    for (let post of result) {
      Post.find({
        include: { model: Reply, where: { postId: post.id } }
      }).then(result2 => {
        if (result2) {
          post.replies = result2.replies;
        }

        loopIndex++;
        if (loopIndex === result.length) {
          res.render("show", {
            posts: result
          });
        }
      });
    }
  });
});

router.post("/write", async (req, res, next) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content
    });
    console.log("데이터 추가 완료");
    res.redirect("/");
  } catch (error) {
    console.log("데이터 추가 실패");
    // next(error);
  }
});

router.get("/edit/:id", function(req, res, next) {
  let postID = req.params.id;

  Post.find({
    where: { id: postID }
  })
    .then(result => {
      res.render("edit", {
        post: result
      });
    })
    .catch(err => {
      console.log("데이터 조회 실패");
    });
});

router.put("/update/:id", function(req, res, next) {
  let postID = req.params.id;
  let body = req.body;

  Post.update(
    {
      title: body.editTitle,
      content: body.editContent
    },
    {
      where: { id: postID }
    }
  )
    .then(result => {
      console.log("데이터 수정 완료");
      res.redirect("/");
    })
    .catch(err => {
      console.log("데이터 수정 실패");
    });
});

router.delete("/delete/:id", function(req, res, next) {
  let postID = req.params.id;

  Post.destroy({
    where: { id: postID }
  })
    .then(result => {
      res.redirect("/");
    })
    .catch(err => {
      console.log("데이터 삭제 실패");
    });
});

router.post("/reply/:postID", function(req, res, next) {
  let postID = req.params.postID;
  let body = req.body;

  Reply.create({
    postId: postID,
    writer: body.replyWriter,
    content: body.replyContent
  })
    .then(results => {
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
