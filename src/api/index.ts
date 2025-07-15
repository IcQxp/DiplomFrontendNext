import axios, { AxiosResponse } from "axios";
import { endpoints } from "./config";
import { Criterion, Discipline, Document, DocumentStatusUpdateModel, DocumentType, Employee, Grade, Group, Lesson, RatingWithCriteria, Role, Student, UserDataPaylod } from "@/types";

axios.interceptors.request.use(config => {
  config.headers['bypass-tunnel-reminder'] = '1';
  return config;
});


async function axiosRequest<T>(method: 'get' | 'post' | 'put' | 'delete', url: string, token?: string, data?: any): Promise<AxiosResponse<T>>  {
  try {
    const headers = {
      // 'bypass-tunnel-reminder':'1',
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response: AxiosResponse<T> = await axios({ method, url, headers, data });
    return response;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
};

async function axiosDocumentRequest  (method: 'get' | 'post' | 'put' | 'delete', url: string, token: string, formData: FormData) {
  try {
    const headers = {
      // 'bypass-tunnel-reminder':'1',
      'Content-Type': 'multipart/form-data',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await axios({ method, url, headers, data: formData });
    // return response.data;
    return response;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
};



const getUserDocuments = (token: string, id: number) =>
  axiosRequest('get', endpoints.getUserDocuments(id), token);

const getMe = (token: string) =>
  axiosRequest('get', endpoints.getMe, token);

const deleteDocument = (token: string, docID: number) =>
  axiosRequest("delete", endpoints.deleteDocument(docID), token);

const updateDocument = (token: string, docID: number, formData: FormData) =>
  axiosDocumentRequest("put", endpoints.updateDocument(docID), token, formData);

const downloadDocument = (token: string, formData: FormData) =>
  axiosDocumentRequest("post", endpoints.downloadDocument, token, formData);

const getAllDocuments = (token?: string) =>
  axiosRequest<Document[]>("get", endpoints.getAllDocuments, token);

const getUserRating = (userID: number) =>
  axiosRequest("get", endpoints.getUserRating(userID));

const getPostUserRating = (data: number[]) =>
  axiosRequest("post", endpoints.getUsersRating, "", data);

const getAllCritea = () =>
  axiosRequest<Criterion[]>("get", endpoints.getAllCritea);

const getUserByID = (userID: string) =>
  axiosRequest("get", endpoints.getUserByID(userID));

const getTopRating = (count: number, criteriaId?: string) =>
  axiosRequest("get", endpoints.getTopRating(count, criteriaId != undefined ? criteriaId : ""));

const getTopRatingWithCriteriaArray = (data: RatingWithCriteria) =>
  axiosRequest("post", endpoints.getTopRatingWithCriteriaArray, "", data);


const getUserSrBallById = (studentId: number) =>
  axiosRequest("get", endpoints.getUserSrBallById(studentId.toString()));

const getAllDisciplines = () => axiosRequest<Discipline[]>("get", endpoints.getAllDisciplines);
const getAllStudents = () => axiosRequest<Student[]>("get", endpoints.getAllStudents);
const getAlldocumentTypes = () => axiosRequest<DocumentType[]>("get", endpoints.getAllDocumentTypes);
const getAllEmployees = () => axiosRequest<Employee[]>("get", endpoints.getAllEmployees);
const getAllGrades = () => axiosRequest<Grade[]>("get", endpoints.getAllGrades);
const getAllGroups = () => axiosRequest<Group[]>("get", endpoints.getAllGroups);
const getAllLessons = () => axiosRequest<Lesson[]>("get", endpoints.getAllLessons);
const getAllRoles = () => axiosRequest<Role[]>("get", endpoints.getAllRoles);
const getAllStatuses = () => axiosRequest<Student[]>("get", endpoints.getAllStatuses);
const getUserDocumentByID = (docId: number) =>
  axiosRequest("get", endpoints.getUserDocumentByID(docId));
const updateDocumentStatus = (documentId: number, model: DocumentStatusUpdateModel) =>
  axiosRequest("put", endpoints.updateDocumentStatus(documentId), "", model);

const postLogin = (data:UserDataPaylod) => axiosRequest('post',endpoints.postLogin,'',data);

export {
  getUserDocuments,
  getMe,
  deleteDocument,
  updateDocument,
  downloadDocument,
  getAllDocuments,
  getUserRating,
  getAllCritea,
  getUserByID,
  getTopRating,
  getTopRatingWithCriteriaArray,
  getPostUserRating,
  getAllDisciplines,
  getAllStudents,
  getAlldocumentTypes,
  getAllEmployees,
  getAllGrades,
  getAllGroups,
  getAllLessons,
  getAllRoles,
  getAllStatuses,
  getUserDocumentByID,
  updateDocumentStatus,
  getUserSrBallById,
  postLogin
}