import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import ImageContainer from "../components/container/ImageContainer";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featured_image);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-1">
            <ImageContainer>
                <div className="w-full relative border rounded-xl overflow-hidden mb-4 p-0">
                    <img
                        src={appwriteService.getFilePreview(post.featured_image)}
                        alt={post.title}
                        className="w-full h-64 md:h-96 object-cover"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-2 z-10">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </ImageContainer>
        </div>
    ) : null;
}