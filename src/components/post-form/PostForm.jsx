import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "../index.js";
import {RTE} from '../index.js'
import appwriteService from "../../api/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [wordCount, setWordCount] = useState(0);
    
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors, isValid } } = useForm({
        mode: "onChange", // Enable real-time validation
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // Watch form values for real-time updates
    const watchedContent = watch("content");
    const watchedTitle = watch("title");

    // Update word count when content changes
    React.useEffect(() => {
        if (watchedContent) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = watchedContent || '';
            const textContent = tempDiv.textContent || tempDiv.innerText || '';
            const words = textContent.trim().split(/\s+/).filter(word => word.length > 0);
            setWordCount(words.length);
        } else {
            setWordCount(0);
        }
    }, [watchedContent]);

    const submit = async (data) => {
        setIsSubmitting(true);
        try {
            console.log('Form data before submission:', data);
            
            // Check if user is authenticated (extra safety check)
            if (!userData || !userData.$id) {
                alert('Authentication error. Please try logging in again.');
                navigate('/login');
                return;
            }
            
            if (post) {
                // For updating posts
                const dbPost = await appwriteService.updatePost(post.slug || post.$id, {
                    title: data.title,
                    content: data.content,
                    status: data.status,
                    featured_image: data.image?.[0] || undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.slug || dbPost.$id}`);
                }
            } else {
                // For creating new posts
                const postData = {
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    status: data.status || 'active',
                    featured_image: data.image?.[0] || null,
                    userId: userData.$id 
                };
                
                console.log('Creating post with:', postData);
                const dbPost = await appwriteService.createPost(postData);

                if (dbPost) {
                    navigate(`/post/${dbPost.slug || dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    // Handle image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {post ? "Edit Post" : "Create New Post"}
                </h1>
                <p className="text-gray-600">
                    {post ? "Update your existing post" : "Share your story with the world"}
                </p>
            </div>

            <form onSubmit={handleSubmit(submit)} className="space-y-6">
                {/* Error Summary */}
                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">
                                    Please fix the following errors:
                                </h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <ul className="list-disc pl-5 space-y-1">
                                        {Object.entries(errors).map(([field, error]) => (
                                            <li key={field}>
                                                <strong className="capitalize">{field}:</strong> {error.message}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title Section */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Post Details</h2>
                            
                            <div className="space-y-4">
                                <Input
                                    label="Title"
                                    placeholder="Enter an engaging title for your post..."
                                    className="text-lg font-medium"
                                    error={!!errors.title}
                                    helperText={errors.title?.message || `${watchedTitle?.length || 0}/100 characters`}
                                    {...register("title", { 
                                        required: "Title is required",
                                        minLength: {
                                            value: 3,
                                            message: "Title must be at least 3 characters long"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Title must be less than 100 characters"
                                        }
                                    })}
                                />
                                
                                <Input
                                    label="URL Slug"
                                    placeholder="url-friendly-post-slug"
                                    className="font-mono text-sm"
                                    error={!!errors.slug}
                                    helperText={errors.slug?.message || "This will be used in the post URL"}
                                    {...register("slug", { 
                                        required: "Slug is required",
                                        minLength: {
                                            value: 3,
                                            message: "Slug must be at least 3 characters long"
                                        },
                                        pattern: {
                                            value: /^[a-z0-9-]+$/,
                                            message: "Slug can only contain lowercase letters, numbers, and hyphens"
                                        }
                                    })}
                                    onInput={(e) => {
                                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                    }}
                                />
                            </div>
                        </div>

                        {/* Content Editor */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Content</h2>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span>Words: {wordCount}</span>
                                    <span>Characters: {watchedContent?.length || 0}</span>
                                </div>
                            </div>
                            
                            <RTE 
                                label="" 
                                name="content" 
                                control={control} 
                                defaultValue={getValues("content")}
                                rules={{
                                    required: "Content is required",
                                    validate: (value) => {
                                        const tempDiv = document.createElement('div');
                                        tempDiv.innerHTML = value || '';
                                        const textContent = tempDiv.textContent || tempDiv.innerText || '';
                                        return textContent.trim().length >= 10 || "Content must be at least 10 characters long";
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Publishing Options */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Publishing</h2>
                            
                            <div className="space-y-4">
                                <Select
                                    options={["active", "inactive"]}
                                    label="Status"
                                    error={!!errors.status}
                                    helperText={errors.status?.message || "Active posts are visible to readers"}
                                    {...register("status", { required: "Please select a status" })}
                                />
                                
                                <div className="flex space-x-2">
                                    <Button 
                                        type="button"
                                        className="flex-1 bg-gray-600 hover:bg-gray-700"
                                        onClick={() => setValue("status", "inactive")}
                                    >
                                        Save Draft
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        className={`flex-1 ${post ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"} ${!isValid || isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                        disabled={!isValid || isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                {post ? "Updating..." : "Publishing..."}
                                            </div>
                                        ) : (
                                            post ? "Update Post" : "Publish Post"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Featured Image</h2>
                            
                            <Input
                                label=""
                                type="file"
                                accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                                error={!!errors.image}
                                helperText={errors.image?.message || "Recommended size: 1200x630px"}
                                {...register("image", { 
                                    required: post ? false : "Featured image is required for new posts" 
                                })}
                                onChange={(e) => {
                                    register("image").onChange(e);
                                    handleImageChange(e);
                                }}
                            />
                            
                            {/* Image Preview */}
                            {(imagePreview || post?.featured_image) && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                                    <div className="relative">
                                        <img
                                            src={imagePreview || (post?.featured_image ? appwriteService.getFilePreview(post.featured_image) : null)}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-lg border border-gray-200"
                                        />
                                        {imagePreview && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagePreview(null);
                                                    setValue("image", null);
                                                }}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* SEO Tips */}
                        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                            <h3 className="text-sm font-semibold text-blue-800 mb-2">💡 Writing Tips</h3>
                            <ul className="text-xs text-blue-700 space-y-1">
                                <li>• Keep titles under 60 characters for SEO</li>
                                <li>• Use headings to structure your content</li>
                                <li>• Add images to make posts engaging</li>
                                <li>• Write compelling introductions</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}