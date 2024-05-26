import { userService } from './user.service';
import { userValidation } from './user.validation';

const createNewUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    // const { error, value } = studentValidationSchema.validate(student); validation using joi
    // validation using jod
    const zodParsedData = userValidation.userValidationSchema.parse(user);

    // if (error) {
    //   return res.status(500).json({
    //     success: false,
    //     message: 'Something Went Wrong',
    //     error: error.details[0].message,
    //   });
    // }
    const result = await userService.createUserOnDb(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });
  } catch (error) {
    const errorMessage = isError(error) ? error.message : 'Unknown error';
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error: errorMessage,
    });
  }
};
export { createNewUser };
