export const apiBaseURL = "http://localhost:8080/api/";

export const registerUserUrl = apiBaseURL + "register"
export const getLoggedUsernameUrl = apiBaseURL + "users/get"

export const getCategoriesURL = apiBaseURL + "categories/getAll/{date}?date=";
export const getCategoryTypesURL = apiBaseURL + "categories/getAllTypes";
export const postCategory = apiBaseURL + "categories/add";
export const deleteCategoryURL = apiBaseURL + "categories/delete/{id}?id=";


export const authTokenName = "jwtToken";
export const unauthorizedMessage = "Unauthorized entry";
export const confirmDeleteMessage = "Are you sure u want to delete this?"
export const loggedOutMessage = "Logged out";