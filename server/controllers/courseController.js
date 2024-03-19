import Course from "../model/course.model.js";
import AppError from "../utils/error.util";

const getAllCourses = async function (req, res, next) {
  try {
    const courses = await Course.find({}).select("-lectures");

    res.status(200).json({
      success: true,
      message: "All Courses",
      courses,
    });
  } catch (error) {
    return next(new AppError("Unable to retrieve the courses", 500));
  }
};

const getLecturesByCourseId = async function (req, res, next) {
  try {
    const {id}= req.params;

    const course= await Course.findById(id);

    if(!course){
        return next(new AppError('Invalid course id', 400));
    }

    res.status(200).json({
        success: true,
        message: 'Course lectures fetched succesfully',
        lectures: course.lectures
    })
  } catch (error) {
    return next(
      new AppError("Unable to retrieve this particular course!", 500)
    );
  }
};

export { getAllCourses, getLecturesByCourseId };
